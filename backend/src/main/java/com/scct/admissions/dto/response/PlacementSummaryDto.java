package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object (DTO) providing aggregated placement statistics for dashboard display.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementSummaryDto {
    private Long totalPlaced;
    private Double avgPackage;
    private List<String> topRecruiters;
}
