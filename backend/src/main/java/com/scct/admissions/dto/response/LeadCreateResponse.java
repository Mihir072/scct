package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Data Transfer Object (DTO) wrapping the response payload after a lead is successfully submitted.
 * Contains the generated lead ID and duplicate detection flags.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadCreateResponse {
    private UUID leadId;
    private String status;
    private Boolean isDuplicate;
}
