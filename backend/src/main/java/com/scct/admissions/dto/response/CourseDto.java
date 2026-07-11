package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDto {
    private UUID id;
    private String name;
    private String slug;
    private String stream;
    private Integer durationYears;
    private BigDecimal feesPerYear;
    private String eligibilityCriteria;
    private String description;
}
