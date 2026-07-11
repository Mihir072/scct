package com.scct.admissions.service.impl;

import com.scct.admissions.entity.PageView;
import com.scct.admissions.repository.PageViewRepository;
import com.scct.admissions.service.PageViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PageViewServiceImpl implements PageViewService {

    @Autowired
    private PageViewRepository pageViewRepository;

    @Override
    public void trackPageView(String pagePath, String sessionId, String utmSource) {
        PageView pageView = PageView.builder()
                .pagePath(pagePath)
                .sessionId(sessionId)
                .utmSource(utmSource)
                .build();
        pageViewRepository.save(pageView);
    }
}
