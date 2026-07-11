package com.scct.admissions.service.impl;

import com.scct.admissions.dto.response.CourseDto;
import com.scct.admissions.entity.Course;
import com.scct.admissions.exception.ResourceNotFoundException;
import com.scct.admissions.mapper.AdmissionsMapper;
import com.scct.admissions.repository.CourseRepository;
import com.scct.admissions.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private AdmissionsMapper admissionsMapper;

    @Override
    public List<CourseDto> getActiveCourses(String stream) {
        List<Course> courses;
        if (stream != null && !stream.trim().isEmpty()) {
            courses = courseRepository.findByIsActiveTrueAndStreamIgnoreCase(stream.trim());
        } else {
            courses = courseRepository.findByIsActiveTrue();
        }
        return admissionsMapper.toCourseDtoList(courses);
    }

    @Override
    public CourseDto getCourseBySlug(String slug) {
        Course course = courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with slug: " + slug));

        if (!course.getIsActive()) {
            throw new ResourceNotFoundException("Course with slug '" + slug + "' is not active");
        }

        return admissionsMapper.toDto(course);
    }
}
