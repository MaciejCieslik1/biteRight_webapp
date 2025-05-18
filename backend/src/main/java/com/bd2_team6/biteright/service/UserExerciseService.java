package com.bd2_team6.biteright.service;

import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.user_exercise.UserExercise;
import com.bd2_team6.biteright.entities.user_exercise.UserExerciseRepository;

@Service
public class UserExerciseService {
    private final UserExerciseRepository userExerciseRepository;

    public UserExerciseService(UserExerciseRepository userExerciseRepository) {
        this.userExerciseRepository = userExerciseRepository;
    }

    public UserExercise getUserExerciseById(Integer userId) {
        UserExercise userExercise = userExerciseRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return userExercise;
    }
}
