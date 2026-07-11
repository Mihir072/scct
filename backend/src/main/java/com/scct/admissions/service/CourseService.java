package com.scct.admissions.service;

import com.scct.admissions.dto.response.CourseDto;

import java.util.List;

public interface CourseService {
    List<CourseDto> getActiveCourses(String stream);
    CourseDto getCourseBySlug(String slug);
}
