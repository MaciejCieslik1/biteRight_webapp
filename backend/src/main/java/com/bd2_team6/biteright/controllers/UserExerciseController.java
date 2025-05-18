package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.entities.user_exercise.UserExercise;
import com.bd2_team6.biteright.service.UserExerciseService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/userExercise")
@RequiredArgsConstructor
public class UserExerciseController {
    private final UserExerciseService userExerciseService;

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findUserExerciseById(@PathVariable("id") Integer userId) {
        try {
            UserExercise userExercise = userExerciseService.getUserExerciseById(userId);
            return ResponseEntity.ok(userExercise);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
