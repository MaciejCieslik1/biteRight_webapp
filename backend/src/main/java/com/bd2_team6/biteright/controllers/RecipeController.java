package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.create_requests.RecipeCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.RecipeUpdateRequest;
import com.bd2_team6.biteright.entities.recipe.Recipe;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.service.RecipeService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findRecipeByName(Authentication authentication, @PathVariable("name") String recipeName) {
        try {
            Recipe recipe = recipeService.findRecipeByName(recipeName);
            return ResponseEntity.ok(recipe);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findRecipeByName(Authentication authentication, @PathVariable("id") Integer recipeId) {
        try {
            Recipe recipe = recipeService.findRecipeById(recipeId);
            return ResponseEntity.ok(recipe);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(Authentication authentication, @RequestBody RecipeCreateRequest request) {
        try {
            Recipe recipe = recipeService.createRecipe(request);
            return ResponseEntity.ok(recipe);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRecipe(Authentication authentication, @RequestBody RecipeUpdateRequest request,
                                          @PathVariable("id") Integer recipeId) {
        try {
            Recipe updated = recipeService.updateRecipe(request, recipeId);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRecipe(Authentication authentication, @PathVariable("id") Integer recipeId) {
        try {
            recipeService.deleteRecipe(recipeId);
            return ResponseEntity.ok("Recipe successfully deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

