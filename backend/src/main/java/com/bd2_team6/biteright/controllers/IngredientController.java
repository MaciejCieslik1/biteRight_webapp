package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.service.IngredientService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/ingredient")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findIngredient(@RequestParam String name) {
        try {
            Set<Ingredient> ingredients = ingredientService.findIngredientsByName(name);
            return ResponseEntity.ok(ingredients);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
