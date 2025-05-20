package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.controllers.requests.create_requests.MealInfoCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.MealInfoUpdateRequest;
import com.bd2_team6.biteright.entities.meal_info.MealInfo;
import com.bd2_team6.biteright.service.MealInfoService;

@RestController
@RequestMapping("/mealInfo")
@RequiredArgsConstructor
public class MealInfoController {
    private final MealInfoService mealInfoService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findMealInfoById(@PathVariable("id") Integer mealId) {
        try {
            MealInfo mealInfo = mealInfoService.findMealInfoById(mealId);
            return ResponseEntity.ok(mealInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findMealInfoByName(@PathVariable("name") String mealName) {
        try {
            MealInfo mealInfo = mealInfoService.findMealInfoByName(mealName);
            return ResponseEntity.ok(mealInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMealInfo(@RequestBody MealInfoCreateRequest request) {
        try {
            MealInfo mealInfo = mealInfoService.createMealInfo(request);
            return ResponseEntity.ok(mealInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMealInfo(@PathVariable("id") Integer mealId, @RequestBody MealInfoUpdateRequest request) {
        try {
            MealInfo mealInfo = mealInfoService.updateMealInfo(mealId, request);
            return ResponseEntity.ok(mealInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMealInfo(@PathVariable("id") Integer mealId) {
        try {
            mealInfoService.deleteMealInfo(mealId);
            return ResponseEntity.ok("Meal info deleted successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
