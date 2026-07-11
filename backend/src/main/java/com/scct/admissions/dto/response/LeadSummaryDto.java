package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadSummaryDto {
    private Long totalLeads;
    private Map<String, Long> statusBreakdown;
    private Map<String, Long> sourceBreakdown;
}
