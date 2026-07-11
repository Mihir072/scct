package com.scct.admissions.controller.publicapi;

import com.scct.admissions.dto.request.PageViewTrackRequest;
import com.scct.admissions.service.PageViewService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/track")
@Slf4j
public class PublicPageViewTrackController {

    @Autowired
    private PageViewService pageViewService;

    @PostMapping("/pageview")
    public ResponseEntity<Void> trackPageView(@Valid @RequestBody PageViewTrackRequest request) {
        try {
            pageViewService.trackPageView(
                    request.getPagePath(),
                    request.getSessionId(),
                    request.getUtmSource()
            );
        } catch (Exception e) {
            log.error("Failed to track page view silently. Error: {}", e.getMessage(), e);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
