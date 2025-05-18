package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.entities.meal_content.MealContent;
import com.bd2_team6.biteright.service.MealContentService;



@RestController
@RequestMapping("/meal")
@RequiredArgsConstructor
public class MealContentController {
    private final MealContentService mealContentService;

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findMealContentByName(@PathVariable("name") String name) {
        try {
            Set<MealContent> mealContents = mealContentService.findMealContentByName(name);
            return ResponseEntity.ok(mealContents);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
