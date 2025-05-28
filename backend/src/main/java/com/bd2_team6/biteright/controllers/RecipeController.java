package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.DTO.RecipeDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.RecipeCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.RecipeUpdateRequest;
import com.bd2_team6.biteright.entities.recipe.Recipe;
import com.bd2_team6.biteright.service.RecipeService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findRecipeByName(Authentication authentication, @PathVariable("name") String recipeName) {
        try {
            RecipeDTO recipeDTO = recipeService.findRecipeByName(recipeName);
            return ResponseEntity.ok(recipeDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findRecipeByName(Authentication authentication, @PathVariable("id") Integer recipeId) {
        try {
            RecipeDTO recipeDTO = recipeService.findRecipeById(recipeId);
            return ResponseEntity.ok(recipeDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(Authentication authentication, @RequestBody RecipeCreateRequest request) {
        try {
            Recipe recipe = recipeService.createRecipe(request);
            RecipeDTO recipeDTO = new RecipeDTO(recipe);
            return ResponseEntity.ok(recipeDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRecipe(Authentication authentication, @RequestBody RecipeUpdateRequest request,
                                          @PathVariable("id") Integer recipeId) {
        try {
            Recipe updated = recipeService.updateRecipe(request, recipeId);
            RecipeDTO recipeDTO = new RecipeDTO(updated);
            return ResponseEntity.ok(recipeDTO);
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

