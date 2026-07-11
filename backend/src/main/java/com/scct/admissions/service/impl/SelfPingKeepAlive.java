package com.scct.admissions.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
@Slf4j
public class SelfPingKeepAlive {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(3))
            .build();

    @Value("${RENDER_EXTERNAL_URL:}")
    private String renderExternalUrl;

    @Value("${server.port:8080}")
    private String serverPort;

    private int pingCount = 0;

    @Scheduled(fixedRate = 4000) // Every 4 seconds
    public void pingSelf() {
        String baseUrl = renderExternalUrl;
        if (baseUrl == null || baseUrl.trim().isEmpty()) {
            // Fallback for local testing
            baseUrl = "http://localhost:" + serverPort;
        }

        // Clean up trailing slash
        if (baseUrl.endsWith("/")) {
            baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
        }

        if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
            baseUrl = "https://" + baseUrl;
        }

        String targetUrl = baseUrl + "/api/courses"; // Use a light-weight public endpoint
        
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(targetUrl))
                    .timeout(Duration.ofSeconds(3))
                    .GET()
                    .build();

            HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());
            pingCount++;
            
            // Log only every 75 pings (approx 5 minutes) to keep logs clean
            if (pingCount % 75 == 0) {
                log.info("Keep-alive ping sent to {} - Status code: {} (total pings: {})", targetUrl, response.statusCode(), pingCount);
            } else {
                log.debug("Keep-alive ping sent to {} - Status code: {}", targetUrl, response.statusCode());
            }
        } catch (Exception e) {
            // Log warning without full stack trace to prevent log flooding
            log.warn("Keep-alive ping failed for URL {}: {}", targetUrl, e.getMessage());
        }
    }
}
