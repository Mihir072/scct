package com.scct.admissions.controller.admin;

import com.scct.admissions.dto.request.LeadStatusUpdateRequest;
import com.scct.admissions.dto.response.LeadDto;
import com.scct.admissions.dto.response.LeadSummaryDto;
import com.scct.admissions.entity.AdminUser;
import com.scct.admissions.repository.AdminUserRepository;
import com.scct.admissions.service.LeadService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/leads")
public class AdminLeadController {

    @Autowired
    private LeadService leadService;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @GetMapping
    public ResponseEntity<Page<LeadDto>> getLeads(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "courseId", required = false) UUID courseId,
            @RequestParam(value = "source", required = false) String source,
            @RequestParam(value = "isDuplicate", required = false) Boolean isDuplicate,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir) {

        Page<LeadDto> leads = leadService.getLeads(page, size, status, courseId, source, isDuplicate, search, sortBy, sortDir);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/summary")
    public ResponseEntity<LeadSummaryDto> getLeadsSummary() {
        return ResponseEntity.ok(leadService.getLeadsSummary());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadDto> updateLeadStatus(
            @PathVariable("id") UUID id,
            @Valid @RequestBody LeadStatusUpdateRequest request) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AdminUser adminUser = adminUserRepository.findByUsername(username).orElse(null);
        UUID adminUserId = (adminUser != null) ? adminUser.getId() : null;

        LeadDto updatedLead = leadService.updateLeadStatus(id, request.getNewStatus(), adminUserId);
        return ResponseEntity.ok(updatedLead);
    }

    @GetMapping("/export")
    public void exportLeads(
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "courseId", required = false) UUID courseId,
            @RequestParam(value = "source", required = false) String source,
            @RequestParam(value = "isDuplicate", required = false) Boolean isDuplicate,
            @RequestParam(value = "search", required = false) String search,
            HttpServletResponse response) throws IOException {

        List<LeadDto> leads = leadService.exportLeads(status, courseId, source, isDuplicate, search);

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"leads.csv\"");

        PrintWriter writer = response.getWriter();
        writer.println("ID,FullName,Email,Phone,CourseName,Message,Source,Status,IsDuplicate,DuplicateOfLeadID,CreatedAt,UpdatedAt");
        for (LeadDto lead : leads) {
            writer.println(String.format("%s,\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",%s,%s,%b,%s,%s,%s",
                    lead.getId(),
                    escapeCsv(lead.getFullName()),
                    escapeCsv(lead.getEmail()),
                    escapeCsv(lead.getPhone()),
                    escapeCsv(lead.getCourseName()),
                    escapeCsv(lead.getMessage()),
                    lead.getSource(),
                    lead.getStatus(),
                    lead.getIsDuplicate(),
                    lead.getDuplicateOfLeadId() != null ? lead.getDuplicateOfLeadId().toString() : "",
                    lead.getCreatedAt(),
                    lead.getUpdatedAt()
            ));
        }
    }

    private String escapeCsv(String val) {
        if (val == null) {
            return "";
        }
        return val.replace("\"", "\"\"");
    }
}
