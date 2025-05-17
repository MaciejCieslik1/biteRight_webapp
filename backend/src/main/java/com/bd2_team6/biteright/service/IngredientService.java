package com.bd2_team6.biteright.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.controllers.requests.create_requests.IngredientCreateRequest;
import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.entities.ingredient.IngredientRepository;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Set<Ingredient> findIngredientsByName(String name) {
        Set<Ingredient> ingredients = ingredientRepository.findByNameContainingIgnoreCase(name);
        return ingredients;
    }

    public Ingredient createIngredient(IngredientCreateRequest request) {
        Ingredient newIngredient = new Ingredient();
        newIngredient.setName(request.getName());
        newIngredient.setBrand(request.getBrand());
        newIngredient.setPortionSize(request.getPortionSize());
        newIngredient.setCalories(request.getCalories());
        newIngredient.setProtein(request.getProtein());
        newIngredient.setFat(request.getFat());
        newIngredient.setCarbs(request.getCarbs());

        return ingredientRepository.save(newIngredient);
    }
}
