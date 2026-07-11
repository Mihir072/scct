package com.scct.admissions.repository;

import com.scct.admissions.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, UUID> {

    @Query("SELECT f FROM Faculty f LEFT JOIN FETCH f.course WHERE " +
           "(:courseId IS NULL OR f.course.id = :courseId) AND " +
           "(:department IS NULL OR LOWER(f.department) = :department)")
    List<Faculty> filterFaculty(@Param("courseId") UUID courseId, @Param("department") String department);
}
