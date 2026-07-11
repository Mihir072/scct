package com.scct.admissions.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Data Transfer Object (DTO) for capturing new admission lead submissions.
 * Includes comprehensive validation rules and UTM parameter mappings.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadCreateRequest {

    @NotBlank(message = "fullName is required")
    @Size(min = 2, max = 100, message = "fullName must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "email is required")
    @Email(message = "email must be in a valid format")
    private String email;

    @NotBlank(message = "phone is required")
    @Pattern(regexp = "^(\\+91)?[6-9]\\d{9}$", message = "phone must match Indian phone format (10 digits, optional +91 prefix)")
    private String phone;

    @NotNull(message = "courseId is required")
    private UUID courseId;

    private String message;

    private String source; // enum LeadSource, default WEBSITE_FORM if not provided

    private String utmSource;
    private String utmMedium;
    private String utmCampaign;
    private String utmTerm;
    private String utmContent;
}
