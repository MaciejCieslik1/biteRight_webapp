package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.daily_summary.DailySummary;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.service.DailySummaryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dailySummary")
@RequiredArgsConstructor
public class DailySummaryController {
    private final DailySummaryService dailySummaryService;
    private final UserRepository userRepository;

    @GetMapping("/find")
    public ResponseEntity<?> findDailySummary(
            Authentication authentication,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            if (date != null) {
                LocalDate summaryDate = LocalDate.parse(date);
                DailySummary dailySummary = dailySummaryService.findDailySummaryByUsernameAndDate(username, summaryDate);
                return ResponseEntity.ok(dailySummary);
            } else if (startDate != null && endDate != null) {
                LocalDate start = LocalDate.parse(startDate);
                LocalDate end = LocalDate.parse(endDate);
                List<DailySummary> summaries = dailySummaryService.findDailySummariesByUsernameBetweenDates(username, start, end);
                return ResponseEntity.ok(summaries);
            } else {
                DailySummary dailySummary = dailySummaryService.findDailySummaryByUsernameAndDate(username, LocalDate.now());
                return ResponseEntity.ok(dailySummary);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}