package com.scct.admissions.service;

import com.scct.admissions.dto.response.FacultyDto;

import java.util.List;
import java.util.UUID;

/**
 * Service interface defining business logic for retrieving faculty and staff profiles.
 */
public interface FacultyService {
    List<FacultyDto> getFaculty(UUID courseId, String department);
}
