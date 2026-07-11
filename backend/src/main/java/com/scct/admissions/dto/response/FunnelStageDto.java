package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FunnelStageDto {
    private String stage;
    private Long count;
    private Double dropOffPercentage;
}
