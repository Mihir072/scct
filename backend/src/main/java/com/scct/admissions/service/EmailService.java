package com.scct.admissions.service;

import com.scct.admissions.entity.Lead;

/**
 * Service interface defining operations for dispatching automated email communications.
 */
public interface EmailService {
    void sendLeadConfirmation(Lead lead);
}
