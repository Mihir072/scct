package com.scct.admissions.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for logging incoming public page views.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageViewTrackRequest {

    @NotBlank(message = "pagePath is required")
    private String pagePath;

    private String sessionId;
    private String utmSource;
}
