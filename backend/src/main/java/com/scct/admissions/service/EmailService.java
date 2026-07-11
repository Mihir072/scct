package com.scct.admissions.service;

import com.scct.admissions.entity.Lead;

public interface EmailService {
    void sendLeadConfirmation(Lead lead);
}
