package com.scct.admissions.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadDto {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private UUID courseId;
    private String courseName;
    private String message;
    private String source;
    private String utmSource;
    private String utmMedium;
    private String utmCampaign;
    private String utmTerm;
    private String utmContent;
    private String status;
    private Boolean isDuplicate;
    private UUID duplicateOfLeadId;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
