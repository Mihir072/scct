package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Data Transfer Object (DTO) for safely exposing historical placement records.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementDto {
    private UUID id;
    private String academicYear;
    private UUID courseId;
    private String courseName;
    private String companyName;
    private BigDecimal packageLpa;
    private Integer studentsPlaced;
}
