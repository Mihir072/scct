package com.scct.admissions.repository;

import com.scct.admissions.entity.PageView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface PageViewRepository extends JpaRepository<PageView, UUID> {

    @Query("SELECT p.pagePath, COUNT(p) FROM PageView p WHERE p.viewedAt >= :fromDateTime AND p.viewedAt <= :toDateTime " +
           "GROUP BY p.pagePath ORDER BY COUNT(p) DESC")
    List<Object[]> getPageTraffic(
            @Param("fromDateTime") OffsetDateTime fromDateTime,
            @Param("toDateTime") OffsetDateTime toDateTime
    );
}
