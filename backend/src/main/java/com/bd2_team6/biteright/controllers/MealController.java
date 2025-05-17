package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.entities.meal.Meal;
import com.bd2_team6.biteright.service.MealService;



@RestController
@RequestMapping("/meal")
@RequiredArgsConstructor
public class MealController {
    private final MealService mealService;

    @GetMapping("/find")
    public ResponseEntity<?> findMeals(Authentication authentication) {
        String username = authentication.getName();

        try {
            Set<Meal> meals = mealService.findMealsByUsername(username);
            return ResponseEntity.ok(meals);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
