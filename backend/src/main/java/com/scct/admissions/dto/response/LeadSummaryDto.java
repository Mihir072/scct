package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * Data Transfer Object (DTO) providing aggregated metrics for the admin dashboard home view.
 * Includes total lead counts and breakdowns by status and acquisition source.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadSummaryDto {
    private Long totalLeads;
    private Map<String, Long> statusBreakdown;
    private Map<String, Long> sourceBreakdown;
}
