package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacultyDto {
    private UUID id;
    private String name;
    private String designation;
    private String department;
    private String qualification;
    private String bio;
    private String photoUrl;
    private UUID courseId;
    private String courseName;
}
