package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.entities.recipe_content.RecipeContent;
import com.bd2_team6.biteright.service.RecipeContentService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/recipeContent")
@RequiredArgsConstructor
public class RecipeContentController {
    private final RecipeContentService recipeContentService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findRecipeContentById(@PathVariable("id") Integer mealId) {
        try {
            RecipeContent recipeContent = recipeContentService.findRecipeContentById(mealId);
            return ResponseEntity.ok(recipeContent);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}