package com.bd2_team6.biteright.controllers.requests.create_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class RecipeContentCreateRequest {
    private Integer recipeId;
    private Integer ingredientId;
    private Integer ingredientAmount;
}
