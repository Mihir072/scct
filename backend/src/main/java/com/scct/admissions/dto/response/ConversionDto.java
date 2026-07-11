package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object (DTO) wrapping conversion performance analytics.
 * Aggregates both course-specific and source-specific conversion statistics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversionDto {
    private List<CourseConversionDto> courseConversion;
    private List<SourceConversionDto> sourceConversion;
}
