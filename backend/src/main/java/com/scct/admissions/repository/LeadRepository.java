package com.scct.admissions.repository;

import com.scct.admissions.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface LeadRepository extends JpaRepository<Lead, UUID>, JpaSpecificationExecutor<Lead> {

    @Query("SELECT l FROM Lead l WHERE (l.email = :email OR l.phone = :phone) " +
           "AND l.createdAt >= :cutoffDate ORDER BY l.createdAt ASC")
    List<Lead> findDuplicateCandidates(
            @Param("email") String email,
            @Param("phone") String phone,
            @Param("cutoffDate") OffsetDateTime cutoffDate
    );

    @Query("SELECT COUNT(l) FROM Lead l")
    long getTotalLeadsCount();

    @Query("SELECT l.status, COUNT(l) FROM Lead l GROUP BY l.status")
    List<Object[]> getStatusBreakdown();

    @Query("SELECT l.source, COUNT(l) FROM Lead l GROUP BY l.source")
    List<Object[]> getSourceBreakdown();

    @Query("SELECT l.course.id, l.course.name, COUNT(l), SUM(CASE WHEN l.status = 'ADMITTED' THEN 1 ELSE 0 END) " +
           "FROM Lead l GROUP BY l.course.id, l.course.name")
    List<Object[]> getCourseConversionStats();

    @Query("SELECT l.source, COUNT(l), SUM(CASE WHEN l.status = 'ADMITTED' THEN 1 ELSE 0 END) " +
           "FROM Lead l GROUP BY l.source")
    List<Object[]> getSourceConversionStats();
}

