package com.scct.admissions.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@Slf4j
public class DbHealthMonitor {

    @Autowired
    private DataSource dataSource;

    private final List<Boolean> lastResults = new CopyOnWriteArrayList<>();
    private static final int MAX_RESULTS = 5;

    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void checkDbConnection() {
        boolean healthy = false;
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute("SELECT 1");
            healthy = true;
            log.info("Database connection ping succeeded.");
        } catch (Exception e) {
            log.error("Database connection ping failed: {}", e.getMessage());
        }

        lastResults.add(healthy);
        if (lastResults.size() > MAX_RESULTS) {
            lastResults.remove(0);
        }
    }

    public boolean isUptimeHealthy() {
        if (lastResults.isEmpty()) {
            // Trigger a quick synchronous check if no scheduled task has run yet
            try (Connection conn = dataSource.getConnection();
                 Statement stmt = conn.createStatement()) {
                stmt.execute("SELECT 1");
                return true;
            } catch (Exception e) {
                log.error("Fallback DB health check failed: {}", e.getMessage());
                return false;
            }
        }
        // Healthy if the latest run was successful
        return lastResults.get(lastResults.size() - 1);
    }
}
