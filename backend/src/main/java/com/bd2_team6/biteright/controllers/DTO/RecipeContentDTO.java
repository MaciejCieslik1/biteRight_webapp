package com.bd2_team6.biteright.controllers.DTO;

import com.bd2_team6.biteright.entities.recipe_content.RecipeContent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class RecipeContentDTO {
    private Integer ingredientId;
    private Integer ingredientAmount;

    public RecipeContentDTO(RecipeContent content) {
        this.ingredientId = content.getIngredient().getIngredientId();
        this.ingredientAmount = content.getIngredientAmount();
    }
}
