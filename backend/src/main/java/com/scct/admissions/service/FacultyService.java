package com.scct.admissions.service;

import com.scct.admissions.dto.response.FacultyDto;

import java.util.List;
import java.util.UUID;

public interface FacultyService {
    List<FacultyDto> getFaculty(UUID courseId, String department);
}
