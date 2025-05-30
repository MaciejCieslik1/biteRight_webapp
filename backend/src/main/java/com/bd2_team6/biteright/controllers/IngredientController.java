package com.bd2_team6.biteright.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.bd2_team6.biteright.controllers.requests.create_requests.IngredientCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.IngredientUpdateRequest;
import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.service.IngredientService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/ingredient")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findIngredient(@PathVariable("name") String name) {
        try {
            Set<Ingredient> ingredients = ingredientService.findIngredientsByName(name);
            return ResponseEntity.ok(ingredients);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createIngredient(@RequestBody IngredientCreateRequest request) {
        try {
            Ingredient newIngredient = ingredientService.createIngredient(request);
            return ResponseEntity.ok(newIngredient);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateIngredient(@PathVariable("id") Integer id, @RequestBody IngredientUpdateRequest request) {
        try {
            Ingredient updatedIngredient = ingredientService.updateIngredient(id, request);
            return ResponseEntity.ok(updatedIngredient);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteIngredient(@PathVariable("id") Integer id) {
        try {
            ingredientService.deleteIngredient(id);
            return ResponseEntity.ok("Ingredient deleted successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
