package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.controllers.DTO.RecipeContentDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.RecipeContentCreateRequest;
import com.bd2_team6.biteright.controllers.requests.create_requests.RecipeCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.RecipeContentUpdateRequest;
import com.bd2_team6.biteright.entities.recipe_content.RecipeContent;
import com.bd2_team6.biteright.service.RecipeContentService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/recipeContent")
@RequiredArgsConstructor
public class RecipeContentController {
    private final RecipeContentService recipeContentService;

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findRecipeContentByName(@PathVariable("id") String recipeName) {
        try {
            Set<RecipeContentDTO> recipeContent = recipeContentService.findRecipeContentByName(recipeName);
            return ResponseEntity.ok(recipeContent);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findRecipeContentById(@PathVariable("id") Integer recipeId) {
        try {
            Set<RecipeContentDTO> recipeContent = recipeContentService.findRecipeContentById(recipeId);
            return ResponseEntity.ok(recipeContent);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> add(@RequestBody RecipeContentCreateRequest request) {
        try {
            RecipeContentDTO recipeContent = recipeContentService.addContentToRecipe(request);
            return ResponseEntity.ok(recipeContent);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Integer contentId, @RequestBody RecipeContentUpdateRequest request) {
        try {
            RecipeContentDTO recipeContent = recipeContentService.updateContent(contentId, request);
            return ResponseEntity.ok(recipeContent);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        try {
            recipeContentService.deleteRecipeContent(id);
            return ResponseEntity.ok("Recipe content successfully deleted");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}