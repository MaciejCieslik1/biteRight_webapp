package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.update_requests.UserGoalUpdateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.UserInfoUpdateRequest;
import com.bd2_team6.biteright.entities.user_goal.UserGoal;
import com.bd2_team6.biteright.service.UserGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userGoal")
@RequiredArgsConstructor
public class UserGoalController {

    private final UserGoalService userGoalService;

    @GetMapping("/findUserGoal")
    public ResponseEntity<?> findUserGoal(Authentication authentication) {
        String username = authentication.getName();

        try {
            UserGoal userGoal = userGoalService.findUserGoalByUsername(username);
            return ResponseEntity.ok(userGoal);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserGoal(Authentication authentication, @RequestBody UserGoalUpdateRequest request) {
        String username = authentication.getName();

        try {
            UserGoal updatedGoal = userGoalService.updateUserGoal(username, request);
            return ResponseEntity.ok(updatedGoal);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
