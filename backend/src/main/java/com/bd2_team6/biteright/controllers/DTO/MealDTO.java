package com.bd2_team6.biteright.controllers.DTO;

import java.time.LocalDateTime;

import com.bd2_team6.biteright.entities.meal.Meal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealDTO {
    private Integer mealId;
    private String name;
    private String description;
    private LocalDateTime mealDate;
    private String mealTypeName;

    public MealDTO(Meal meal) {
        this.mealId = meal.getMealId();
        this.name = meal.getName();
        this.description = meal.getDescription();
        this.mealDate = meal.getMealDate();
        this.mealTypeName = meal.getMealType().getName();
    }
}
