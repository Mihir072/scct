package com.scct.admissions.service;

public interface PageViewService {
    void trackPageView(String pagePath, String sessionId, String utmSource);
}
