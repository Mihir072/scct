package com.scct.admissions.repository;

import com.scct.admissions.entity.FormStatus;
import com.scct.admissions.entity.FormSubmissionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Data Access Object (DAO) for tracking and counting {@link FormSubmissionEvent} telemetry.
 * Used for system health monitoring and dashboard diagnostics.
 */
@Repository
public interface FormSubmissionEventRepository extends JpaRepository<FormSubmissionEvent, UUID> {

    long countBySubmittedAtBetween(OffsetDateTime from, OffsetDateTime to);

    long countByStatusAndSubmittedAtBetween(FormStatus status, OffsetDateTime from, OffsetDateTime to);
}
