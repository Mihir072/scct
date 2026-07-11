package com.scct.admissions.service.impl;

import com.scct.admissions.dto.request.LeadCreateRequest;
import com.scct.admissions.dto.response.LeadCreateResponse;
import com.scct.admissions.dto.response.LeadDto;
import com.scct.admissions.dto.response.LeadSummaryDto;
import com.scct.admissions.entity.*;
import com.scct.admissions.exception.InvalidStateTransitionException;
import com.scct.admissions.exception.ResourceNotFoundException;
import com.scct.admissions.exception.ValidationException;
import com.scct.admissions.mapper.AdmissionsMapper;
import com.scct.admissions.repository.CourseRepository;
import com.scct.admissions.repository.FormSubmissionEventRepository;
import com.scct.admissions.repository.LeadRepository;
import com.scct.admissions.repository.LeadStatusHistoryRepository;
import com.scct.admissions.service.EmailService;
import com.scct.admissions.service.LeadService;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class LeadServiceImpl implements LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LeadStatusHistoryRepository leadStatusHistoryRepository;

    @Autowired
    private FormSubmissionEventRepository formSubmissionEventRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AdmissionsMapper admissionsMapper;

    @Override
    @Transactional
    public LeadCreateResponse createLead(LeadCreateRequest request) {
        log.info("Processing lead submission for email: {}", request.getEmail());

        // Validate course
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ValidationException("courseId", "Course not found"));

        if (!course.getIsActive()) {
            throw new ValidationException("courseId", "Enquired course is inactive");
        }

        // Duplicate detection: same email OR same phone in the last 30 days
        OffsetDateTime cutoffDate = OffsetDateTime.now().minusDays(30);
        List<Lead> duplicateCandidates = leadRepository.findDuplicateCandidates(
                request.getEmail(), request.getPhone(), cutoffDate);

        boolean isDuplicate = false;
        Lead parentLead = null;

        if (!duplicateCandidates.isEmpty()) {
            isDuplicate = true;
            parentLead = duplicateCandidates.get(0);
            log.info("Duplicate lead detected. Earliest matching lead ID: {}", parentLead.getId());
        }

        // Map request source or default to WEBSITE_FORM
        LeadSource source = LeadSource.WEBSITE_FORM;
        if (request.getSource() != null && !request.getSource().trim().isEmpty()) {
            try {
                source = LeadSource.valueOf(request.getSource().trim().toUpperCase());
            } catch (IllegalArgumentException e) {
                log.warn("Invalid source provided: {}, defaulting to WEBSITE_FORM", request.getSource());
            }
        }

        // Build lead
        Lead lead = Lead.builder()
                .fullName(request.getFullName())
                .email(request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null)
                .phone(request.getPhone())
                .course(course)
                .message(request.getMessage())
                .source(source)
                .utmSource(request.getUtmSource())
                .utmMedium(request.getUtmMedium())
                .utmCampaign(request.getUtmCampaign())
                .utmTerm(request.getUtmTerm())
                .utmContent(request.getUtmContent())
                .status(LeadStatus.NEW)
                .isDuplicate(isDuplicate)
                .duplicateOfLead(parentLead)
                .build();

        lead = leadRepository.save(lead);

        // Record initial status in history
        LeadStatusHistory history = LeadStatusHistory.builder()
                .lead(lead)
                .fromStatus(null)
                .toStatus(LeadStatus.NEW)
                .changedBy(null)
                .build();
        leadStatusHistoryRepository.save(history);

        // Record success in form_submission_events
        FormSubmissionEvent event = FormSubmissionEvent.builder()
                .formType(FormType.ENQUIRY)
                .status(FormStatus.SUCCESS)
                .submittedAt(OffsetDateTime.now())
                .build();
        formSubmissionEventRepository.save(event);

        // Send confirmation email asynchronously
        emailService.sendLeadConfirmation(lead);

        return LeadCreateResponse.builder()
                .leadId(lead.getId())
                .status(lead.getStatus().name())
                .isDuplicate(lead.getIsDuplicate())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LeadDto> getLeads(int page, int size, String status, UUID courseId, String source, Boolean isDuplicate, String search, String sortBy, String sortDir) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        Specification<Lead> spec = getLeadSpecification(status, courseId, source, isDuplicate, search);
        Page<Lead> leadsPage = leadRepository.findAll(spec, pageRequest);

        return leadsPage.map(admissionsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public LeadSummaryDto getLeadsSummary() {
        long totalLeads = leadRepository.getTotalLeadsCount();

        List<Object[]> statusRows = leadRepository.getStatusBreakdown();
        Map<String, Long> statusBreakdown = new HashMap<>();
        for (Object[] row : statusRows) {
            statusBreakdown.put(((LeadStatus) row[0]).name(), (Long) row[1]);
        }

        List<Object[]> sourceRows = leadRepository.getSourceBreakdown();
        Map<String, Long> sourceBreakdown = new HashMap<>();
        for (Object[] row : sourceRows) {
            sourceBreakdown.put(((LeadSource) row[0]).name(), (Long) row[1]);
        }

        return LeadSummaryDto.builder()
                .totalLeads(totalLeads)
                .statusBreakdown(statusBreakdown)
                .sourceBreakdown(sourceBreakdown)
                .build();
    }

    @Override
    @Transactional
    public LeadDto updateLeadStatus(UUID id, String newStatus, UUID adminUserId) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with ID: " + id));

        LeadStatus nextStatus;
        try {
            nextStatus = LeadStatus.valueOf(newStatus.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidStateTransitionException("Invalid status value: " + newStatus);
        }

        LeadStatus currentStatus = lead.getStatus();
        validateTransition(currentStatus, nextStatus);

        lead.setStatus(nextStatus);
        lead = leadRepository.save(lead);

        // Record history
        LeadStatusHistory history = LeadStatusHistory.builder()
                .lead(lead)
                .fromStatus(currentStatus)
                .toStatus(nextStatus)
                .changedBy(adminUserId)
                .build();
        leadStatusHistoryRepository.save(history);

        log.info("Lead {} status updated from {} to {} by admin {}", id, currentStatus, nextStatus, adminUserId);
        return admissionsMapper.toDto(lead);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeadDto> exportLeads(String status, UUID courseId, String source, Boolean isDuplicate, String search) {
        Specification<Lead> spec = getLeadSpecification(status, courseId, source, isDuplicate, search);
        List<Lead> leads = leadRepository.findAll(spec, Sort.by(Sort.Direction.DESC, "createdAt"));
        return admissionsMapper.toLeadDtoList(leads);
    }

    private Specification<Lead> getLeadSpecification(String status, UUID courseId, String source, Boolean isDuplicate, String search) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null && !status.trim().isEmpty()) {
                try {
                    LeadStatus leadStatus = LeadStatus.valueOf(status.trim().toUpperCase());
                    predicates.add(cb.equal(root.get("status"), leadStatus));
                } catch (IllegalArgumentException e) {
                    log.warn("Invalid status filter ignored: {}", status);
                }
            }

            if (courseId != null) {
                predicates.add(cb.equal(root.get("course").get("id"), courseId));
            }

            if (source != null && !source.trim().isEmpty()) {
                try {
                    LeadSource leadSource = LeadSource.valueOf(source.trim().toUpperCase());
                    predicates.add(cb.equal(root.get("source"), leadSource));
                } catch (IllegalArgumentException e) {
                    log.warn("Invalid source filter ignored: {}", source);
                }
            }

            if (isDuplicate != null) {
                predicates.add(cb.equal(root.get("isDuplicate"), isDuplicate));
            }

            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.trim().toLowerCase() + "%";
                Predicate namePredicate = cb.like(cb.lower(root.get("fullName")), searchPattern);
                Predicate emailPredicate = cb.like(cb.lower(root.get("email")), searchPattern);
                Predicate phonePredicate = cb.like(cb.lower(root.get("phone")), searchPattern);
                predicates.add(cb.or(namePredicate, emailPredicate, phonePredicate));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public void validateTransition(LeadStatus current, LeadStatus next) {
        if (current == next) {
            return;
        }

        if (current == LeadStatus.ADMITTED) {
            throw new InvalidStateTransitionException("Cannot change status of a lead that has already been ADMITTED");
        }

        // Terminal rules for REJECTED and LOST
        if (current == LeadStatus.REJECTED || current == LeadStatus.LOST) {
            throw new InvalidStateTransitionException("Cannot change status of a lead that is in terminal state: " + current);
        }

        // Target state is REJECTED or LOST
        if (next == LeadStatus.REJECTED || next == LeadStatus.LOST) {
            return;
        }

        // Sequential state machine rules
        boolean isValid = false;
        if (current == LeadStatus.NEW && next == LeadStatus.CONTACTED) {
            isValid = true;
        } else if (current == LeadStatus.CONTACTED && next == LeadStatus.APPLICATION_STARTED) {
            isValid = true;
        } else if (current == LeadStatus.APPLICATION_STARTED && next == LeadStatus.APPLICATION_SUBMITTED) {
            isValid = true;
        } else if (current == LeadStatus.APPLICATION_SUBMITTED && next == LeadStatus.ADMITTED) {
            isValid = true;
        }

        if (!isValid) {
            throw new InvalidStateTransitionException(
                    String.format("Invalid state transition from %s directly to %s. Must follow sequence: NEW -> CONTACTED -> APPLICATION_STARTED -> APPLICATION_SUBMITTED -> ADMITTED", current, next)
            );
        }
    }
}
