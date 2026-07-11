package com.scct.admissions.controller.publicapi;

import com.scct.admissions.dto.response.CourseDto;
import com.scct.admissions.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class PublicCourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseDto>> getActiveCourses(
            @RequestParam(value = "stream", required = false) String stream) {
        return ResponseEntity.ok(courseService.getActiveCourses(stream));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<CourseDto> getCourseBySlug(@PathVariable("slug") String slug) {
        return ResponseEntity.ok(courseService.getCourseBySlug(slug));
    }
}
