package com.scct.admissions.service.impl;

import com.scct.admissions.dto.response.FacultyDto;
import com.scct.admissions.entity.Faculty;
import com.scct.admissions.mapper.AdmissionsMapper;
import com.scct.admissions.repository.FacultyRepository;
import com.scct.admissions.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private AdmissionsMapper admissionsMapper;

    @Override
    public List<FacultyDto> getFaculty(UUID courseId, String department) {
        String dept = (department != null && !department.trim().isEmpty()) ? department.trim().toLowerCase() : null;
        List<Faculty> faculties = facultyRepository.filterFaculty(courseId, dept);
        return admissionsMapper.toFacultyDtoList(faculties);
    }
}
