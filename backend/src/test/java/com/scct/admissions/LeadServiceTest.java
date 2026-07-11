package com.scct.admissions;

import com.scct.admissions.dto.request.LeadCreateRequest;
import com.scct.admissions.dto.response.LeadCreateResponse;
import com.scct.admissions.entity.Course;
import com.scct.admissions.entity.Lead;
import com.scct.admissions.entity.LeadStatus;
import com.scct.admissions.exception.InvalidStateTransitionException;
import com.scct.admissions.exception.ValidationException;
import com.scct.admissions.repository.CourseRepository;
import com.scct.admissions.repository.FormSubmissionEventRepository;
import com.scct.admissions.repository.LeadRepository;
import com.scct.admissions.repository.LeadStatusHistoryRepository;
import com.scct.admissions.service.EmailService;
import com.scct.admissions.service.impl.LeadServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private LeadStatusHistoryRepository leadStatusHistoryRepository;

    @Mock
    private FormSubmissionEventRepository formSubmissionEventRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private LeadServiceImpl leadService;

    private Course activeCourse;
    private LeadCreateRequest request;

    @BeforeEach
    public void setUp() {
        activeCourse = Course.builder()
                .id(UUID.randomUUID())
                .name("B.Sc Computer Science")
                .isActive(true)
                .build();

        request = LeadCreateRequest.builder()
                .fullName("Test Lead")
                .email("test@scct.edu")
                .phone("9876543210")
                .courseId(activeCourse.getId())
                .source("WEBSITE_FORM")
                .build();
    }

    @Test
    public void testCreateLead_SuccessfulNoDuplicate() {
        when(courseRepository.findById(request.getCourseId())).thenReturn(Optional.of(activeCourse));
        when(leadRepository.findDuplicateCandidates(any(), any(), any())).thenReturn(Collections.emptyList());
        
        Lead savedLead = Lead.builder()
                .id(UUID.randomUUID())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .course(activeCourse)
                .status(LeadStatus.NEW)
                .isDuplicate(false)
                .build();
        when(leadRepository.save(any(Lead.class))).thenReturn(savedLead);

        LeadCreateResponse response = leadService.createLead(request);

        assertNotNull(response);
        assertEquals(savedLead.getId(), response.getLeadId());
        assertEquals("NEW", response.getStatus());
        assertFalse(response.getIsDuplicate());

        verify(leadRepository, times(1)).save(any(Lead.class));
        verify(leadStatusHistoryRepository, times(1)).save(any());
        verify(formSubmissionEventRepository, times(1)).save(any());
        verify(emailService, times(1)).sendLeadConfirmation(any());
    }

    @Test
    public void testCreateLead_SuccessfulWithDuplicate() {
        when(courseRepository.findById(request.getCourseId())).thenReturn(Optional.of(activeCourse));
        
        Lead parentLead = Lead.builder()
                .id(UUID.randomUUID())
                .fullName("Original Lead")
                .email(request.getEmail())
                .phone(request.getPhone())
                .createdAt(OffsetDateTime.now().minusDays(5))
                .build();
        
        when(leadRepository.findDuplicateCandidates(any(), any(), any()))
                .thenReturn(List.of(parentLead));

        Lead savedDuplicateLead = Lead.builder()
                .id(UUID.randomUUID())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .course(activeCourse)
                .status(LeadStatus.NEW)
                .isDuplicate(true)
                .duplicateOfLead(parentLead)
                .build();
        when(leadRepository.save(any(Lead.class))).thenReturn(savedDuplicateLead);

        LeadCreateResponse response = leadService.createLead(request);

        assertNotNull(response);
        assertEquals(savedDuplicateLead.getId(), response.getLeadId());
        assertTrue(response.getIsDuplicate());

        verify(leadRepository, times(1)).save(any(Lead.class));
    }

    @Test
    public void testCreateLead_InactiveCourseThrowsException() {
        activeCourse.setIsActive(false);
        when(courseRepository.findById(request.getCourseId())).thenReturn(Optional.of(activeCourse));

        assertThrows(ValidationException.class, () -> leadService.createLead(request));
        verify(leadRepository, never()).save(any());
    }

    @Test
    public void testStatusTransition_ValidLinearTransitions() {
        // NEW -> CONTACTED
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.NEW, LeadStatus.CONTACTED));
        
        // CONTACTED -> APPLICATION_STARTED
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.CONTACTED, LeadStatus.APPLICATION_STARTED));
        
        // APPLICATION_STARTED -> APPLICATION_SUBMITTED
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.APPLICATION_STARTED, LeadStatus.APPLICATION_SUBMITTED));
        
        // APPLICATION_SUBMITTED -> ADMITTED
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.APPLICATION_SUBMITTED, LeadStatus.ADMITTED));
    }

    @Test
    public void testStatusTransition_ValidTerminalTransitions() {
        // Any of NEW, CONTACTED, APPLICATION_STARTED, APPLICATION_SUBMITTED -> REJECTED
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.NEW, LeadStatus.REJECTED));
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.CONTACTED, LeadStatus.REJECTED));
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.APPLICATION_STARTED, LeadStatus.REJECTED));
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.APPLICATION_SUBMITTED, LeadStatus.REJECTED));

        // Any of NEW, CONTACTED, APPLICATION_STARTED, APPLICATION_SUBMITTED -> LOST
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.NEW, LeadStatus.LOST));
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.CONTACTED, LeadStatus.LOST));
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.APPLICATION_STARTED, LeadStatus.LOST));
        assertDoesNotThrow(() -> leadService.validateTransition(LeadStatus.APPLICATION_SUBMITTED, LeadStatus.LOST));
    }

    @Test
    public void testStatusTransition_InvalidJumps() {
        // NEW -> ADMITTED (Invalid jump)
        assertThrows(InvalidStateTransitionException.class, 
                () -> leadService.validateTransition(LeadStatus.NEW, LeadStatus.ADMITTED));
        
        // CONTACTED -> APPLICATION_SUBMITTED (Invalid jump)
        assertThrows(InvalidStateTransitionException.class, 
                () -> leadService.validateTransition(LeadStatus.CONTACTED, LeadStatus.APPLICATION_SUBMITTED));
        
        // ADMITTED -> REJECTED (Cannot transition from ADMITTED)
        assertThrows(InvalidStateTransitionException.class, 
                () -> leadService.validateTransition(LeadStatus.ADMITTED, LeadStatus.REJECTED));
        
        // REJECTED -> NEW (Cannot transition from terminal status)
        assertThrows(InvalidStateTransitionException.class, 
                () -> leadService.validateTransition(LeadStatus.REJECTED, LeadStatus.NEW));
    }
}
