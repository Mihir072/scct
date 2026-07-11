package com.scct.admissions.service;

import com.scct.admissions.dto.response.PlacementDto;
import com.scct.admissions.dto.response.PlacementSummaryDto;

import java.util.List;
import java.util.UUID;

public interface PlacementService {
    List<PlacementDto> getPlacements(String year, UUID courseId);
    PlacementSummaryDto getPlacementSummary();
}
