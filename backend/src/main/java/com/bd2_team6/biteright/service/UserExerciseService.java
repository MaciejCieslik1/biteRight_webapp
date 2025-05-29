package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.create_requests.UserExerciseCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.UserExerciseUpdateRequest;
import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfo;
import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfoRepository;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.user_exercise.UserExercise;
import com.bd2_team6.biteright.entities.user_exercise.UserExerciseRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class UserExerciseService {

    private final UserRepository userRepository;
    private final ExerciseInfoRepository exerciseInfoRepository;
    private final UserExerciseRepository userExerciseRepository;

    public UserExercise createUserExercise(String username, UserExerciseCreateRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        ExerciseInfo exerciseInfo = exerciseInfoRepository.findById(request.getExerciseInfoId()).orElseThrow(() ->
                new IllegalArgumentException("Exercise info not found"));
        UserExercise userExercise = new UserExercise(user, exerciseInfo, request.getActivityDate(), request.getDuration(),
                request.getCaloriesBurnt());

        userExerciseRepository.save(userExercise);
        return userExercise;
    }

    public Page<UserExercise> findUserExercisesByUsername(String username, Pageable pageable) {
        if (!userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("User not found");
        }
        return userExerciseRepository.findByUserUsername(username, pageable);
    }

    public Page<UserExercise> findUserExercisesByDate(String username, LocalDate date, Pageable pageable) {
        if (!userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("User not found");
        }

        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay().minusNanos(1);

        return userExerciseRepository.findByUserUsernameAndActivityDateBetween(username, startOfDay, endOfDay, pageable);
    }

    public UserExercise findLastExerciseByUsername(String username) {
        return userExerciseRepository.findTopByUserUsernameOrderByActivityDateDesc(username)
                .orElseThrow(() -> new IllegalArgumentException("No user's exercise records found for user: " + username));
    }


    public UserExercise findExerciseById(String username, int userExerciseId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId();
        UserExercise userExercise = userExerciseRepository.findById(userExerciseId)
                .orElseThrow(() -> new IllegalArgumentException("User's exercise with provided id not found"));

        if (userExercise.getUser().getId().equals(userId)) {
            return userExercise;
        }
        else {
            throw new IllegalArgumentException("User's exercise with provided id does not belong to user");
        }
    }

    public UserExercise updateUserExerciseById(String username, int userExerciseId,
                                                    UserExerciseUpdateRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId();
        UserExercise userExercise = userExerciseRepository.findById(userExerciseId)
                .orElseThrow(() -> new IllegalArgumentException("User's exercise with provided id not found"));

        if (userExercise.getUser().getId().equals(userId)) {
            userExercise.setActivityDate(request.getActivityDate());
            userExercise.setDuration(request.getDuration());
            userExercise.setCaloriesBurnt(request.getCaloriesBurnt());
            userExerciseRepository.save(userExercise);
            return userExercise;
        }
        else {
            throw new IllegalArgumentException("User's exercise with provided id does not belong to user");
        }
    }

    public void deleteUserExerciseById(String username, int userExerciseId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId();
        UserExercise userExercise = userExerciseRepository.findById(userExerciseId)
                .orElseThrow(() -> new IllegalArgumentException("User's exercise with provided id not found"));

        if (userExercise.getUser().getId().equals(userId)) {
            userExerciseRepository.delete(userExercise);
        }
        else {
            throw new IllegalArgumentException("User's exercise with provided id does not belong to user");
        }
    }

    public UserExerciseService(UserRepository userRepository, ExerciseInfoRepository exerciseInfoRepository, UserExerciseRepository userExerciseRepository) {
        this.userRepository = userRepository;
        this.exerciseInfoRepository = exerciseInfoRepository;
        this.userExerciseRepository = userExerciseRepository;
    }
}
