package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.entities.recipe.Recipe;
import com.bd2_team6.biteright.service.RecipeService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findRecipeName(@PathVariable("name") String name) {
        try {
            Recipe recipe = recipeService.findRecipeByName(name);
            return ResponseEntity.ok(recipe);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
