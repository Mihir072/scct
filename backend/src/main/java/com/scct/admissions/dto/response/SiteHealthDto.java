package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteHealthDto {
    private Double formSubmissionSuccessRate;
    private List<PageTrafficRecord> pageTraffic;
    private Boolean uptimeIndicator;
}
