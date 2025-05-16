package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.daily_limits.DailyLimits;
import com.bd2_team6.biteright.service.DailyLimitsService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/dailyLimits")
@RequiredArgsConstructor
public class DailyLimitsController {
    private final DailyLimitsService dailyLimitsService;

    @GetMapping("/findDailyLimits")
    public ResponseEntity<?> findDailyLimits(Authentication authentication) {
        String username = authentication.getName();

        try {
            DailyLimits dailyLimits = dailyLimitsService.findDailyLimitsByUsername(username);
            return ResponseEntity.ok(dailyLimits);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
