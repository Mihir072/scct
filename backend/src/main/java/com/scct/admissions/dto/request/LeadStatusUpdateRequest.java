package com.scct.admissions.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for transitioning a lead to a new status stage.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeadStatusUpdateRequest {

    @NotBlank(message = "newStatus is required")
    private String newStatus;
}
