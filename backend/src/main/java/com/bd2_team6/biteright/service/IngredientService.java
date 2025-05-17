package com.bd2_team6.biteright.service;

import java.util.Set;

import org.springframework.stereotype.Service;

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
}
