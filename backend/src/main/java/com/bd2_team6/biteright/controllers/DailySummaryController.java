package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.daily_summary.DailySummary;
import com.bd2_team6.biteright.service.DailySummaryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/dailySummary")
@RequiredArgsConstructor
public class DailySummaryController {
    private final DailySummaryService dailySummaryService;

    @GetMapping("/findDailySummary")
    public ResponseEntity<?> findDailySummary(Authentication authentication) {
        String username = authentication.getName();

        try {
            DailySummary dailySummary = dailySummaryService.findDailySummaryByUsername(username);
            return ResponseEntity.ok(dailySummary);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
