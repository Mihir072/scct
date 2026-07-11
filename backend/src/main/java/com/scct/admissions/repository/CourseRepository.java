package com.scct.admissions.repository;

import com.scct.admissions.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Data Access Object (DAO) for retrieving {@link Course} entities.
 * Supports finding courses by unique slug and active status.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {
    Optional<Course> findBySlug(String slug);
    List<Course> findByIsActiveTrue();
    List<Course> findByIsActiveTrueAndStreamIgnoreCase(String stream);
}
