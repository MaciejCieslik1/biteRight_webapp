package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.meal.Meal;
import com.bd2_team6.biteright.entities.meal.MealRepository;
import com.bd2_team6.biteright.entities.meal_content.MealContent;
import com.bd2_team6.biteright.entities.meal_content.MealContentRepository;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealContentService {
    private final MealContentRepository mealContentRepository;
    private final MealRepository mealRepository;

    @Autowired
    public MealContentService(MealContentRepository mealContentRepository, MealRepository mealRepository) {
        this.mealContentRepository = mealContentRepository;
        this.mealRepository = mealRepository;
    }

    public Set<MealContent> findMealContentByName(String mealName) {
        Meal meal = mealRepository.findByName(mealName)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found"));
        return meal.getMealContents();
    }
}
