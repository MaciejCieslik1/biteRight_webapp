package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.meal.Meal;
import com.bd2_team6.biteright.entities.meal.MealRepository;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealService {
    private final UserRepository userRepository;
    private final MealRepository mealRepository;

    @Autowired
    public MealService(UserRepository userRepository, MealRepository mealRepository) {
        this.userRepository = userRepository;
        this.mealRepository = mealRepository;
    }

    public Set<Meal> findUserMealsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getMeals();
    }
}
