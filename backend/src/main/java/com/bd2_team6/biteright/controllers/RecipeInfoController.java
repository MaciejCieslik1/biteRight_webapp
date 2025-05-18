package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.entities.recipe_info.RecipeInfo;
import com.bd2_team6.biteright.service.RecipeInfoService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/recipeInfo")
@RequiredArgsConstructor
public class RecipeInfoController {
    private final RecipeInfoService recipeInfoService;

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findRecipeInfoByName(@PathVariable("name") String recipeName) {
        try {
            RecipeInfo recipeInfo = recipeInfoService.findRecipeInfoByName(recipeName);
            return ResponseEntity.ok(recipeInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findRecipeInfoById(@PathVariable("id") Integer recipeId) {
        try {
            RecipeInfo recipeInfo = recipeInfoService.findRecipeInfoById(recipeId);
            return ResponseEntity.ok(recipeInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
