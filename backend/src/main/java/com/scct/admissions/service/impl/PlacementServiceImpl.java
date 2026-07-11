package com.scct.admissions.service.impl;

import com.scct.admissions.dto.response.PlacementDto;
import com.scct.admissions.dto.response.PlacementSummaryDto;
import com.scct.admissions.entity.Placement;
import com.scct.admissions.mapper.AdmissionsMapper;
import com.scct.admissions.repository.PlacementRepository;
import com.scct.admissions.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PlacementServiceImpl implements PlacementService {

    @Autowired
    private PlacementRepository placementRepository;

    @Autowired
    private AdmissionsMapper admissionsMapper;

    @Override
    public List<PlacementDto> getPlacements(String year, UUID courseId) {
        String yr = (year != null && !year.trim().isEmpty()) ? year.trim() : null;
        List<Placement> placements = placementRepository.filterPlacements(yr, courseId);
        return admissionsMapper.toPlacementDtoList(placements);
    }

    @Override
    public PlacementSummaryDto getPlacementSummary() {
        Long totalPlaced = placementRepository.getTotalStudentsPlaced();
        Double avgPackage = placementRepository.getAveragePackageLpa();
        List<String> topRecruiters = placementRepository.getTopRecruiters();

        // Limit top recruiters to top 5
        List<String> limitedRecruiters = topRecruiters.stream()
                .limit(5)
                .collect(Collectors.toList());

        return PlacementSummaryDto.builder()
                .totalPlaced(totalPlaced != null ? totalPlaced : 0L)
                .avgPackage(avgPackage != null ? avgPackage : 0.0)
                .topRecruiters(limitedRecruiters)
                .build();
    }
}
