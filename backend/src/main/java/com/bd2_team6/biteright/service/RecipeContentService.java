package com.bd2_team6.biteright.service;

import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.controllers.request.RecipeContentrequest;
import com.bd2_team6.biteright.controllers.requests.create_requests.RecipeCreateRequest;
import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.entities.recipe.Recipe;
import com.bd2_team6.biteright.entities.recipe.RecipeRepository;
import com.bd2_team6.biteright.entities.recipe_content.RecipeContent;
import com.bd2_team6.biteright.entities.recipe_content.RecipeContentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RecipeContentService {
    private final RecipeContentRepository recipeContentRepository;
    private final RecipeRepository recipeRepository;

    public RecipeContentService(RecipeContentRepository recipeContentRepository, RecipeRepository recipeRepository) {
        this.recipeContentRepository = recipeContentRepository;
        this.recipeRepository = recipeRepository;
    }

    public RecipeContent findRecipeContentById(Integer recipeId) {
        RecipeContent recipeContent = recipeContentRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe content not found"));
        return recipeContent;
    }

}
