package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing aggregated view counts for a specific URL path.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageTrafficRecord {
    private String pagePath;
    private Long viewCount;
}
