package com.bd2_team6.biteright.service;

import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.recipe_content.RecipeContent;
import com.bd2_team6.biteright.entities.recipe_content.RecipeContentRepository;

@Service
public class RecipeContentService {
    private final RecipeContentRepository recipeContentRepository;

    public RecipeContentService(RecipeContentRepository recipeContentRepository) {
        this.recipeContentRepository = recipeContentRepository;
    }

    public RecipeContent findRecipeContentById(Integer recipeId) {
        RecipeContent recipeContent = recipeContentRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe content not found"));
        return recipeContent;
    }
}
