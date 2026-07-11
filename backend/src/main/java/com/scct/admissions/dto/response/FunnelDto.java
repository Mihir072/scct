package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object (DTO) representing a complete snapshot of the admissions funnel.
 * Contains a sequentially ordered list of stage metrics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FunnelDto {
    private List<FunnelStageDto> funnelStages;
}
