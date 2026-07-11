package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing a single stage in the admissions funnel.
 * Tracks the raw count and drop-off rate compared to the preceding stage.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FunnelStageDto {
    private String stage;
    private Long count;
    private Double dropOffPercentage;
}
