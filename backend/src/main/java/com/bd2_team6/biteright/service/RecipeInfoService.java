package com.bd2_team6.biteright.service;

import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.recipe_info.RecipeInfo;
import com.bd2_team6.biteright.entities.recipe_info.RecipeInfoRepository;

@Service
public class RecipeInfoService {
    private final RecipeInfoRepository recipeInfoRepository;

    public RecipeInfoService(RecipeInfoRepository recipeInfoRepository) {
        this.recipeInfoRepository = recipeInfoRepository;
    }

    public RecipeInfo findRecipeInfoByName(String recipeName) {
        RecipeInfo recipeInfo = recipeInfoRepository.findByRecipeName(recipeName)
                .orElseThrow(() -> new IllegalArgumentException("Recipe info not found"));
        return recipeInfo;
    }

    public RecipeInfo findRecipeInfoById(Integer recipeId) {
        RecipeInfo recipeInfo = recipeInfoRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe info not found"));
        return recipeInfo;
    }
}
