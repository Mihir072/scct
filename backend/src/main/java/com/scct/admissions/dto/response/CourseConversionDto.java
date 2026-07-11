package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Data Transfer Object (DTO) representing the admission conversion rate for a specific course.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseConversionDto {
    private UUID courseId;
    private String courseName;
    private Double conversionRate;
}
