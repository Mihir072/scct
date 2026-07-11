package com.scct.admissions.repository;

import com.scct.admissions.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Data Access Object (DAO) for retrieving {@link Placement} statistics.
 * Aggregates placement data to calculate average packages, total hires, and top recruiting companies.
 */
@Repository
public interface PlacementRepository extends JpaRepository<Placement, UUID> {

    @Query("SELECT p FROM Placement p JOIN FETCH p.course WHERE " +
           "(:academicYear IS NULL OR p.academicYear = :academicYear) AND " +
           "(:courseId IS NULL OR p.course.id = :courseId)")
    List<Placement> filterPlacements(@Param("academicYear") String academicYear, @Param("courseId") UUID courseId);

    @Query("SELECT SUM(p.studentsPlaced) FROM Placement p")
    Long getTotalStudentsPlaced();

    @Query("SELECT AVG(p.packageLpa) FROM Placement p")
    Double getAveragePackageLpa();

    // Query to find top recruiters grouped by company_name, sorted by total students placed desc
    @Query("SELECT p.companyName FROM Placement p GROUP BY p.companyName ORDER BY SUM(p.studentsPlaced) DESC")
    List<String> getTopRecruiters();
}
