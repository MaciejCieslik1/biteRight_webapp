package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.create_requests.DailyLimitsCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.DailyLimitsUpdateRequest;
import com.bd2_team6.biteright.entities.daily_limits.DailyLimits;
import com.bd2_team6.biteright.entities.user.UserRepository;
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
    private final UserRepository userRepository;

    @GetMapping("/find")
    public ResponseEntity<?> findDailyLimits(Authentication authentication) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            DailyLimits dailyLimits = dailyLimitsService.findDailyLimitsByUsername(username);
            return ResponseEntity.ok(dailyLimits);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> addDailyLimits(Authentication authentication, @RequestBody DailyLimitsCreateRequest request) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            DailyLimits newDailyLimits = dailyLimitsService.createDailyLimits(username, request);
            return ResponseEntity.ok(newDailyLimits);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateDailyLimits(Authentication authentication, @RequestBody DailyLimitsUpdateRequest request) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            DailyLimits updatedDailyLimits = dailyLimitsService.updateDailyLimits(username, request);
            return ResponseEntity.ok(updatedDailyLimits);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
