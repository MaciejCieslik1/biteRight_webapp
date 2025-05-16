package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.user_preferences.UserPreferences;
import com.bd2_team6.biteright.service.UserPreferencesService;
import com.bd2_team6.biteright.controllers.requests.update_requests.UserPreferencesUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userPreferences")
@RequiredArgsConstructor
public class UserPreferencesController {

    private final UserPreferencesService userPreferencesService;

    @GetMapping("/findUserPreferences")
    public ResponseEntity<?> findUserPreferences(Authentication authentication) {
        String username = authentication.getName();

        try {
            UserPreferences userPreferences = userPreferencesService.findUserPreferencesByUsername(username);
            return ResponseEntity.ok(userPreferences);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserPreferences(Authentication authentication,
                                                    @RequestBody UserPreferencesUpdateRequest request) {
        String username = authentication.getName();

        try {
            UserPreferences userPreferences = userPreferencesService.updateUserPreferences(username, request);
            return ResponseEntity.ok(userPreferences);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
