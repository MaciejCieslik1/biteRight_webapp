package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.meal.Meal;
import com.bd2_team6.biteright.entities.meal.MealRepository;
import com.bd2_team6.biteright.entities.meal_info.MealInfo;
import com.bd2_team6.biteright.entities.meal_info.MealInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealInfoService {
    private final MealInfoRepository mealInfoRepository;
    private final MealRepository mealRepository;

    @Autowired
    public MealInfoService(MealRepository mealRepository, MealInfoRepository mealInfoRepository) {
        this.mealRepository = mealRepository;
        this.mealInfoRepository = mealInfoRepository;
    }

    public MealInfo findMealInfoById(Integer mealId) {
        MealInfo mealInfo = mealInfoRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal info not found"));
        return mealInfo;
    }

    public MealInfo findMealInfoByName(String name) {
        Meal meal = mealRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found"));
        Integer mealId = meal.getMealId();
        MealInfo mealInfo = mealInfoRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal info not found"));
        return mealInfo;
    }
}
