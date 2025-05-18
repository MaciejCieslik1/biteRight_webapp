package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.entities.meal_info.MealInfo;
import com.bd2_team6.biteright.service.MealInfoService;

@RestController
@RequestMapping("/mealInfo")
@RequiredArgsConstructor
public class MealInfoController {
    private final MealInfoService mealInfoService;

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findUserMeals(@PathVariable("name") String name) {
        try {
            MealInfo mealInfo = mealInfoService.findMealInfoByName(name);
            return ResponseEntity.ok(mealInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
