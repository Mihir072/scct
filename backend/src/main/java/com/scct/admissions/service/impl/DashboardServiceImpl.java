package com.scct.admissions.service.impl;

import com.scct.admissions.dto.response.*;
import com.scct.admissions.entity.FormStatus;
import com.scct.admissions.entity.LeadSource;
import com.scct.admissions.entity.LeadStatus;
import com.scct.admissions.repository.FormSubmissionEventRepository;
import com.scct.admissions.repository.LeadRepository;
import com.scct.admissions.repository.LeadStatusHistoryRepository;
import com.scct.admissions.repository.PageViewRepository;
import com.scct.admissions.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Slf4j
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private FormSubmissionEventRepository formSubmissionEventRepository;

    @Autowired
    private PageViewRepository pageViewRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private LeadStatusHistoryRepository leadStatusHistoryRepository;

    @Autowired
    private DbHealthMonitor dbHealthMonitor;

    @Override
    public SiteHealthDto getSiteHealth(OffsetDateTime from, OffsetDateTime to) {
        long totalSubmissions = formSubmissionEventRepository.countBySubmittedAtBetween(from, to);
        long successSubmissions = formSubmissionEventRepository.countByStatusAndSubmittedAtBetween(FormStatus.SUCCESS, from, to);

        double successRate = totalSubmissions > 0
                ? ((double) successSubmissions / totalSubmissions) * 100.0
                : 0.0;

        List<Object[]> trafficRows = pageViewRepository.getPageTraffic(from, to);
        List<PageTrafficRecord> pageTraffic = trafficRows.stream()
                .map(row -> PageTrafficRecord.builder()
                        .pagePath((String) row[0])
                        .viewCount((Long) row[1])
                        .build())
                .collect(Collectors.toList());

        boolean uptime = dbHealthMonitor.isUptimeHealthy();

        return SiteHealthDto.builder()
                .formSubmissionSuccessRate(successRate)
                .pageTraffic(pageTraffic)
                .uptimeIndicator(uptime)
                .build();
    }

    @Override
    public FunnelDto getFunnelMetrics(UUID courseId, String source) {
        LeadSource leadSource = null;
        if (source != null && !source.trim().isEmpty()) {
            try {
                leadSource = LeadSource.valueOf(source.trim().toUpperCase());
            } catch (IllegalArgumentException e) {
                log.warn("Invalid source filter provided for funnel: {}", source);
            }
        }

        long newCount = leadStatusHistoryRepository.countLeadsReachedStatus(LeadStatus.NEW, courseId, leadSource);
        long contactedCount = leadStatusHistoryRepository.countLeadsReachedStatus(LeadStatus.CONTACTED, courseId, leadSource);
        long startedCount = leadStatusHistoryRepository.countLeadsReachedStatus(LeadStatus.APPLICATION_STARTED, courseId, leadSource);
        long submittedCount = leadStatusHistoryRepository.countLeadsReachedStatus(LeadStatus.APPLICATION_SUBMITTED, courseId, leadSource);
        long admittedCount = leadStatusHistoryRepository.countLeadsReachedStatus(LeadStatus.ADMITTED, courseId, leadSource);

        double dropNew = newCount > 0 ? ((double) (newCount - contactedCount) / newCount) * 100.0 : 0.0;
        double dropContacted = contactedCount > 0 ? ((double) (contactedCount - startedCount) / contactedCount) * 100.0 : 0.0;
        double dropStarted = startedCount > 0 ? ((double) (startedCount - submittedCount) / startedCount) * 100.0 : 0.0;
        double dropSubmitted = submittedCount > 0 ? ((double) (submittedCount - admittedCount) / submittedCount) * 100.0 : 0.0;

        List<FunnelStageDto> stages = new ArrayList<>();
        stages.add(new FunnelStageDto("NEW", newCount, dropNew));
        stages.add(new FunnelStageDto("CONTACTED", contactedCount, dropContacted));
        stages.add(new FunnelStageDto("APPLICATION_STARTED", startedCount, dropStarted));
        stages.add(new FunnelStageDto("APPLICATION_SUBMITTED", submittedCount, dropSubmitted));
        stages.add(new FunnelStageDto("ADMITTED", admittedCount, 0.0)); // Terminal funnel stage has 0.0 drop-off

        return FunnelDto.builder()
                .funnelStages(stages)
                .build();
    }

    @Override
    public ConversionDto getConversionMetrics() {
        List<Object[]> courseRows = leadRepository.getCourseConversionStats();
        List<CourseConversionDto> courseConversions = courseRows.stream()
                .map(row -> {
                    UUID id = (UUID) row[0];
                    String name = (String) row[1];
                    long total = (Long) row[2];
                    long admitted = (Long) row[3];
                    double rate = total > 0 ? ((double) admitted / total) * 100.0 : 0.0;
                    return CourseConversionDto.builder()
                            .courseId(id)
                            .courseName(name)
                            .conversionRate(rate)
                            .build();
                })
                .collect(Collectors.toList());

        List<Object[]> sourceRows = leadRepository.getSourceConversionStats();
        List<SourceConversionDto> sourceConversions = sourceRows.stream()
                .map(row -> {
                    String source = ((LeadSource) row[0]).name();
                    long total = (Long) row[1];
                    long admitted = (Long) row[2];
                    double rate = total > 0 ? ((double) admitted / total) * 100.0 : 0.0;
                    return SourceConversionDto.builder()
                            .source(source)
                            .conversionRate(rate)
                            .build();
                })
                .collect(Collectors.toList());

        return ConversionDto.builder()
                .courseConversion(courseConversions)
                .sourceConversion(sourceConversions)
                .build();
    }
}
