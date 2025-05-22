package com.bd2_team6.biteright.controllers.requests.create_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class IngredientCreateRequest {
    private String name;
    private String brand;
    private Integer portionSize;
    private Integer calories;
    private Integer protein;
    private Integer fat;
    private Integer carbs;
}
