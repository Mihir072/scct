package com.scct.admissions.service;

import com.scct.admissions.dto.request.LeadCreateRequest;
import com.scct.admissions.dto.response.LeadCreateResponse;
import com.scct.admissions.dto.response.LeadDto;
import com.scct.admissions.dto.response.LeadSummaryDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface LeadService {
    LeadCreateResponse createLead(LeadCreateRequest request);
    Page<LeadDto> getLeads(int page, int size, String status, UUID courseId, String source, Boolean isDuplicate, String search, String sortBy, String sortDir);
    LeadSummaryDto getLeadsSummary();
    LeadDto updateLeadStatus(UUID id, String newStatus, UUID adminUserId);
    List<LeadDto> exportLeads(String status, UUID courseId, String source, Boolean isDuplicate, String search);
}
