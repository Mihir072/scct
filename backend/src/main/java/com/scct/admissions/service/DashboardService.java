package com.scct.admissions.service;

import com.scct.admissions.dto.response.ConversionDto;
import com.scct.admissions.dto.response.FunnelDto;
import com.scct.admissions.dto.response.SiteHealthDto;

import java.time.OffsetDateTime;
import java.util.UUID;

public interface DashboardService {
    SiteHealthDto getSiteHealth(OffsetDateTime from, OffsetDateTime to);
    FunnelDto getFunnelMetrics(UUID courseId, String source);
    ConversionDto getConversionMetrics();
}
