package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing the admission conversion rate segmented by lead acquisition source.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SourceConversionDto {
    private String source;
    private Double conversionRate;
}
