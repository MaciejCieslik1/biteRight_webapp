package com.bd2_team6.biteright.service;

import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.recipe.Recipe;
import com.bd2_team6.biteright.entities.recipe.RecipeRepository;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public Recipe findRecipeByName(String name) {
        Recipe recipe = recipeRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
        return recipe;
    }
}
