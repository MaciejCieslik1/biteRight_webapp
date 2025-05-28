package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.controllers.DTO.MealContentDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.MealContentCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.MealContentUpdateRequest;
import com.bd2_team6.biteright.entities.meal_content.MealContent;
import com.bd2_team6.biteright.service.MealContentService;

@RestController
@RequestMapping("/mealContent")
@RequiredArgsConstructor
public class MealContentController {
    private final MealContentService mealContentService;

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findMealContentByName(@PathVariable("name") String mealName) {
        try {
            Set<MealContent> mealContents = mealContentService.findMealContentByName(mealName);
            return ResponseEntity.ok(mealContents);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findByName/{id}")
    public ResponseEntity<?> findMealContentById(@PathVariable("id") Integer mealId) {
        try {
            MealContentDTO mealContent = mealContentService.findMealContentById(mealId);
            return ResponseEntity.ok(mealContent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> add(@RequestBody MealContentCreateRequest request) {
        try {
            MealContentDTO mealContent = mealContentService.addContentToMeal(request);
            return ResponseEntity.ok(mealContent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Integer contentId,
                                    @RequestBody MealContentUpdateRequest request) {
        try {
            MealContentDTO mealContent = mealContentService.updateContent(contentId, request);
            return ResponseEntity.ok(mealContent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        try {
            mealContentService.deleteMealContent(id);
            return ResponseEntity.ok("Meal content successfully deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
