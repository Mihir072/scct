package com.scct.admissions.mapper;

import com.scct.admissions.dto.response.CourseDto;
import com.scct.admissions.dto.response.FacultyDto;
import com.scct.admissions.dto.response.LeadDto;
import com.scct.admissions.dto.response.PlacementDto;
import com.scct.admissions.entity.Course;
import com.scct.admissions.entity.Faculty;
import com.scct.admissions.entity.Lead;
import com.scct.admissions.entity.Placement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AdmissionsMapper {

    CourseDto toDto(Course course);
    List<CourseDto> toCourseDtoList(List<Course> courses);

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.name", target = "courseName")
    FacultyDto toDto(Faculty faculty);
    List<FacultyDto> toFacultyDtoList(List<Faculty> faculties);

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.name", target = "courseName")
    PlacementDto toDto(Placement placement);
    List<PlacementDto> toPlacementDtoList(List<Placement> placements);

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.name", target = "courseName")
    @Mapping(source = "duplicateOfLead.id", target = "duplicateOfLeadId")
    LeadDto toDto(Lead lead);
    List<LeadDto> toLeadDtoList(List<Lead> leads);
}
