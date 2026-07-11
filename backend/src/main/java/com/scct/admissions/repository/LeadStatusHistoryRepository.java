package com.scct.admissions.repository;

import com.scct.admissions.entity.LeadStatus;
import com.scct.admissions.entity.LeadSource;
import com.scct.admissions.entity.LeadStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Data Access Object (DAO) for querying the audit trail of {@link LeadStatusHistory}.
 * Enables funnel analytics by counting how many leads reached a specific pipeline stage.
 */
@Repository
public interface LeadStatusHistoryRepository extends JpaRepository<LeadStatusHistory, UUID> {

    @Query("SELECT COUNT(DISTINCT h.lead.id) FROM LeadStatusHistory h JOIN h.lead l WHERE h.toStatus = :status " +
           "AND (:courseId IS NULL OR l.course.id = :courseId) " +
           "AND (:source IS NULL OR l.source = :source)")
    long countLeadsReachedStatus(
            @Param("status") LeadStatus status,
            @Param("courseId") UUID courseId,
            @Param("source") LeadSource source
    );
}
