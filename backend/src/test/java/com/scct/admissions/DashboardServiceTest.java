package com.scct.admissions;

import com.scct.admissions.dto.response.FunnelDto;
import com.scct.admissions.dto.response.FunnelStageDto;
import com.scct.admissions.entity.LeadStatus;
import com.scct.admissions.repository.LeadStatusHistoryRepository;
import com.scct.admissions.service.impl.DashboardServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DashboardServiceTest {

    @Mock
    private LeadStatusHistoryRepository leadStatusHistoryRepository;

    @InjectMocks
    private DashboardServiceImpl dashboardService;

    @Test
    public void testFunnelMetrics_CorrectDropOffPercentageMath() {
        UUID courseId = UUID.randomUUID();
        String source = "WEBSITE_FORM";

        // Mock counts
        when(leadStatusHistoryRepository.countLeadsReachedStatus(eq(LeadStatus.NEW), eq(courseId), any())).thenReturn(100L);
        when(leadStatusHistoryRepository.countLeadsReachedStatus(eq(LeadStatus.CONTACTED), eq(courseId), any())).thenReturn(80L);
        when(leadStatusHistoryRepository.countLeadsReachedStatus(eq(LeadStatus.APPLICATION_STARTED), eq(courseId), any())).thenReturn(40L);
        when(leadStatusHistoryRepository.countLeadsReachedStatus(eq(LeadStatus.APPLICATION_SUBMITTED), eq(courseId), any())).thenReturn(30L);
        when(leadStatusHistoryRepository.countLeadsReachedStatus(eq(LeadStatus.ADMITTED), eq(courseId), any())).thenReturn(15L);

        FunnelDto result = dashboardService.getFunnelMetrics(courseId, source);

        assertNotNull(result);
        assertEquals(5, result.getFunnelStages().size());

        // Stage 0: NEW
        FunnelStageDto stageNew = result.getFunnelStages().get(0);
        assertEquals("NEW", stageNew.getStage());
        assertEquals(100L, stageNew.getCount());
        assertEquals(20.0, stageNew.getDropOffPercentage(), 0.001); // (100 - 80) / 100 * 100 = 20%

        // Stage 1: CONTACTED
        FunnelStageDto stageContacted = result.getFunnelStages().get(1);
        assertEquals("CONTACTED", stageContacted.getStage());
        assertEquals(80L, stageContacted.getCount());
        assertEquals(50.0, stageContacted.getDropOffPercentage(), 0.001); // (80 - 40) / 80 * 100 = 50%

        // Stage 2: APPLICATION_STARTED
        FunnelStageDto stageStarted = result.getFunnelStages().get(2);
        assertEquals("APPLICATION_STARTED", stageStarted.getStage());
        assertEquals(40L, stageStarted.getCount());
        assertEquals(25.0, stageStarted.getDropOffPercentage(), 0.001); // (40 - 30) / 40 * 100 = 25%

        // Stage 3: APPLICATION_SUBMITTED
        FunnelStageDto stageSubmitted = result.getFunnelStages().get(3);
        assertEquals("APPLICATION_SUBMITTED", stageSubmitted.getStage());
        assertEquals(30L, stageSubmitted.getCount());
        assertEquals(50.0, stageSubmitted.getDropOffPercentage(), 0.001); // (30 - 15) / 30 * 100 = 50%

        // Stage 4: ADMITTED
        FunnelStageDto stageAdmitted = result.getFunnelStages().get(4);
        assertEquals("ADMITTED", stageAdmitted.getStage());
        assertEquals(15L, stageAdmitted.getCount());
        assertEquals(0.0, stageAdmitted.getDropOffPercentage(), 0.001); // Terminal stage drop-off = 0
    }

    @Test
    public void testFunnelMetrics_HandlesZerosGracefully() {
        when(leadStatusHistoryRepository.countLeadsReachedStatus(any(), any(), any())).thenReturn(0L);

        FunnelDto result = dashboardService.getFunnelMetrics(null, null);

        assertNotNull(result);
        for (FunnelStageDto stage : result.getFunnelStages()) {
            assertEquals(0L, stage.getCount());
            assertEquals(0.0, stage.getDropOffPercentage(), 0.001);
        }
    }
}
