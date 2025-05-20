package com.bd2_team6.biteright.controllers.requests.update_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class RecipeInfoUpdateRequest {
    private String recipeName;
    private Double calories;
    private Double protein;
    private Double fat;
    private Double carbs;
}
