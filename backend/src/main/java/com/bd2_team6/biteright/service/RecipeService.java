package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.DTO.RecipeContentDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.RecipeCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.RecipeUpdateRequest;
import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.entities.ingredient.IngredientRepository;
import com.bd2_team6.biteright.entities.recipe.Recipe;
import com.bd2_team6.biteright.entities.recipe.RecipeRepository;
import com.bd2_team6.biteright.entities.recipe_content.RecipeContent;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    public Recipe findRecipeByName(String name) {
        return recipeRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
    }

    public Recipe findRecipeById(Integer recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
    }

    public Recipe createRecipe(RecipeCreateRequest request) {
        Recipe recipe = new Recipe();
        recipe.setName(request.getName());
        recipe.setDescription(request.getDescription());

        for (RecipeContentDTO dto : request.getContents()) {
            Ingredient ingredient = ingredientRepository.findById(dto.getIngredientId())
                    .orElseThrow(() -> new IllegalArgumentException("Ingredient not found"));

            RecipeContent content = new RecipeContent();
            content.setIngredient(ingredient);
            content.setIngredientAmount(dto.getIngredientAmount());
            content.setRecipe(recipe);

            recipe.getRecipeContents().add(content);
        }

        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(RecipeUpdateRequest request, Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));

        recipe.setName(request.getName());
        recipe.setDescription(request.getDescription());

        recipe.getRecipeContents().clear();

        for (RecipeContentDTO dto : request.getContents()) {
            Ingredient ingredient = ingredientRepository.findById(dto.getIngredientId())
                    .orElseThrow(() -> new IllegalArgumentException("Ingredient not found"));

            RecipeContent content = new RecipeContent();
            content.setIngredient(ingredient);
            content.setIngredientAmount(dto.getIngredientAmount());
            content.setRecipe(recipe);

            recipe.getRecipeContents().add(content);
        }

        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
        recipeRepository.delete(recipe);
    }
}
