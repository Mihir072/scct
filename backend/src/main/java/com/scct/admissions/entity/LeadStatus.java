package com.scct.admissions.entity;

/**
 * Represents the current stage of a lead in the admissions pipeline.
 */
public enum LeadStatus {
    NEW,
    CONTACTED,
    APPLICATION_STARTED,
    APPLICATION_SUBMITTED,
    ADMITTED,
    REJECTED,
    LOST
}
