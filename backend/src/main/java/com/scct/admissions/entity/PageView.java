package com.scct.admissions.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Captures anonymous web traffic telemetry.
 * Logs page hits and associates them with active UTM parameters for marketing analysis.
 */
@Entity
@Table(name = "page_views")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageView {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "page_path", nullable = false)
    private String pagePath;

    @CreationTimestamp
    @Column(name = "viewed_at", nullable = false, updatable = false)
    private OffsetDateTime viewedAt;

    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "utm_source")
    private String utmSource;
}
