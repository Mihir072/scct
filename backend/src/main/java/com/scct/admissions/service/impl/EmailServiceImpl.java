package com.scct.admissions.service.impl;

import com.scct.admissions.entity.Lead;
import com.scct.admissions.service.EmailService;
import jakarta.annotation.PostConstruct;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.host:logging}")
    private String smtpHost;

    @Value("${spring.mail.username:}")
    private String smtpUsername;

    @Value("${mail.from-email}")
    private String fromEmail;

    @PostConstruct
    public void logMailConfig() {
        if ("logging".equalsIgnoreCase(smtpHost) || mailSender == null) {
            log.warn("Email service running in CONSOLE-ONLY mode (SMTP host = '{}').", smtpHost);
        } else {
            log.info("Email service configured: host={}, username={}, from={}", smtpHost, smtpUsername, fromEmail);
        }
    }

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
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(lead.getEmail());
            helper.setSubject(subject);
            helper.setText(body);
            mailSender.send(mimeMessage);
            log.info("Confirmation email successfully sent to: {}", lead.getEmail());
        } catch (Exception e) {
            log.error("Failed to deliver confirmation email to: {} | Lead ID: {} | SMTP Host: {} | Error Class: {} | Message: {}",
                    lead.getEmail(), lead.getId(), smtpHost, e.getClass().getSimpleName(), e.getMessage());
            if (e.getCause() != null) {
                log.error("Root cause: {} - {}", e.getCause().getClass().getSimpleName(), e.getCause().getMessage());
            }
        }
    }
}

