package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.daily_summary.DailySummary;
import com.bd2_team6.biteright.entities.user.UserRepository;
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
    private final UserRepository userRepository;

    @GetMapping("/find")
    public ResponseEntity<?> findDailySummary(Authentication authentication) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            DailySummary dailySummary = dailySummaryService.findDailySummaryByUsername(username);
            return ResponseEntity.ok(dailySummary);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
