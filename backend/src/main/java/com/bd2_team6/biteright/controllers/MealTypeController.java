package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.entities.meal_type.MealType;
import com.bd2_team6.biteright.service.MealTypeService;

@RestController
@RequestMapping("/mealInfo")
@RequiredArgsConstructor
public class MealTypeController {
    private final MealTypeService mealTypeService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findUserMeals(@PathVariable("id") Integer mealId) {
        try {
            MealType mealType = mealTypeService.findMealTypeById(mealId);
            return ResponseEntity.ok(mealType);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
