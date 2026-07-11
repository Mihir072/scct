package com.scct.admissions.controller.admin;

import com.scct.admissions.dto.response.ConversionDto;
import com.scct.admissions.dto.response.FunnelDto;
import com.scct.admissions.dto.response.FunnelStageDto;
import com.scct.admissions.dto.response.SiteHealthDto;
import com.scct.admissions.service.DashboardService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/site-health")
    public ResponseEntity<SiteHealthDto> getSiteHealth(
            @RequestParam(value = "from", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime from,
            @RequestParam(value = "to", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime to) {

        OffsetDateTime toVal = (to != null) ? to : OffsetDateTime.now();
        OffsetDateTime fromVal = (from != null) ? from : toVal.minusDays(30);

        return ResponseEntity.ok(dashboardService.getSiteHealth(fromVal, toVal));
    }

    @GetMapping("/funnel")
    public ResponseEntity<FunnelDto> getFunnel(
            @RequestParam(value = "courseId", required = false) UUID courseId,
            @RequestParam(value = "source", required = false) String source) {
        return ResponseEntity.ok(dashboardService.getFunnelMetrics(courseId, source));
    }

    @GetMapping("/conversion")
    public ResponseEntity<ConversionDto> getConversion() {
        return ResponseEntity.ok(dashboardService.getConversionMetrics());
    }

    @GetMapping("/funnel/export")
    public void exportFunnel(
            @RequestParam(value = "courseId", required = false) UUID courseId,
            @RequestParam(value = "source", required = false) String source,
            HttpServletResponse response) throws IOException {

        FunnelDto funnel = dashboardService.getFunnelMetrics(courseId, source);

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"funnel.csv\"");

        PrintWriter writer = response.getWriter();
        writer.println("Stage,Count,DropOffPercentage");
        for (FunnelStageDto stage : funnel.getFunnelStages()) {
            writer.println(String.format("%s,%d,%.2f", stage.getStage(), stage.getCount(), stage.getDropOffPercentage()));
        }
    }
}
