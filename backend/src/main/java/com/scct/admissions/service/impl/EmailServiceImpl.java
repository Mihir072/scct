package com.scct.admissions.service.impl;

import com.scct.admissions.entity.Lead;
import com.scct.admissions.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.host:logging}")
    private String smtpHost;

    @Value("${mail.from-email}")
    private String fromEmail;

    @Override
    @Async
    public void sendLeadConfirmation(Lead lead) {
        log.info("Asynchronously initiating email dispatch to: {}", lead.getEmail());

        String courseName = lead.getCourse().getName();
        String subject = "Admission Enquiry Confirmation - " + courseName;
        String body = String.format(
                "Dear %s,\n\n" +
                "Thank you for your enquiry regarding the %s course at SCCT.\n" +
                "Our admissions team will review your details and contact you shortly.\n\n" +
                "Details Enquired:\n" +
                "- Name: %s\n" +
                "- Phone: %s\n" +
                "- Course: %s\n\n" +
                "Best regards,\n" +
                "SCCT Admissions Team",
                lead.getFullName(), courseName, lead.getFullName(), lead.getPhone(), courseName
        );

        if ("logging".equalsIgnoreCase(smtpHost) || mailSender == null) {
            log.info("==== [Console SMTP Log] ====");
            log.info("From: {}", fromEmail);
            log.info("To: {}", lead.getEmail());
            log.info("Subject: {}", subject);
            log.info("Body:\n{}", body);
            log.info("============================");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(lead.getEmail());
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Confirmation email successfully sent to: {}", lead.getEmail());
        } catch (Exception e) {
            log.error("Failed to deliver confirmation email to: {} for lead: {}. Error: {}", 
                    lead.getEmail(), lead.getId(), e.getMessage(), e);
        }
    }
}
