package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.entities.limit_history.LimitHistory;
import com.bd2_team6.biteright.service.LimitHistoryService;

@RestController
@RequestMapping("/limitHistory")
@RequiredArgsConstructor
public class LimitHistoryController {
    private final LimitHistoryService limitHistoryService;

    @GetMapping("/find")
    public ResponseEntity<?> findLimitHistory(Authentication authentication) {
        String username = authentication.getName();

        try {
            Set<LimitHistory> limitHistories = limitHistoryService.findLimitHistoryByUsername(username);
            return ResponseEntity.ok(limitHistories);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
