package com.scct.admissions.controller.publicapi;

import com.scct.admissions.dto.response.FacultyDto;
import com.scct.admissions.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/faculty")
public class PublicFacultyController {

    @Autowired
    private FacultyService facultyService;

    @GetMapping
    public ResponseEntity<List<FacultyDto>> getFaculty(
            @RequestParam(value = "courseId", required = false) UUID courseId,
            @RequestParam(value = "departmentId", required = false) String departmentId) {
        return ResponseEntity.ok(facultyService.getFaculty(courseId, departmentId));
    }
}
