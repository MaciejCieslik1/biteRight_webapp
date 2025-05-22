package com.bd2_team6.biteright.controllers.requests.update_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class MealInfoUpdateRequest {
    private String mealName;
    private Float calories;
    private Float protein;
    private Float fat;
    private Float carbs;
}