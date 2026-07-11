package com.scct.admissions.controller.publicapi;

import com.scct.admissions.dto.response.PlacementDto;
import com.scct.admissions.dto.response.PlacementSummaryDto;
import com.scct.admissions.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/placements")
public class PublicPlacementController {

    @Autowired
    private PlacementService placementService;

    @GetMapping
    public ResponseEntity<List<PlacementDto>> getPlacements(
            @RequestParam(value = "year", required = false) String year,
            @RequestParam(value = "courseId", required = false) UUID courseId) {
        return ResponseEntity.ok(placementService.getPlacements(year, courseId));
    }

    @GetMapping("/summary")
    public ResponseEntity<PlacementSummaryDto> getPlacementSummary() {
        return ResponseEntity.ok(placementService.getPlacementSummary());
    }
}
