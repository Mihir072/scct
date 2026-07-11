package com.scct.admissions.controller.publicapi;

import com.scct.admissions.dto.request.LeadCreateRequest;
import com.scct.admissions.dto.response.LeadCreateResponse;
import com.scct.admissions.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leads")
public class PublicLeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping
    public ResponseEntity<LeadCreateResponse> createLead(@Valid @RequestBody LeadCreateRequest request) {
        LeadCreateResponse response = leadService.createLead(request);
        return ResponseEntity.ok(response);
    }
}
