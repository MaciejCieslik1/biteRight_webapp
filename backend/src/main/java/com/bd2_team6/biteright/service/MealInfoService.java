package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.create_requests.MealInfoCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.MealInfoUpdateRequest;
import com.bd2_team6.biteright.entities.meal_info.MealInfo;
import com.bd2_team6.biteright.entities.meal_info.MealInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealInfoService {
    private final MealInfoRepository mealInfoRepository;

    @Autowired
    public MealInfoService(MealInfoRepository mealInfoRepository) {
        this.mealInfoRepository = mealInfoRepository;
    }

    public MealInfo findMealInfoById(Integer mealId) {
        MealInfo mealInfo = mealInfoRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal info not found"));
        return mealInfo;
    }

    public MealInfo findMealInfoByName(String mealName) {
        MealInfo mealInfo = mealInfoRepository.findByMealName(mealName)
                .orElseThrow(() -> new IllegalArgumentException("Meal info not found"));
        return mealInfo;
    }

    public MealInfo createMealInfo(MealInfoCreateRequest request) {        
        MealInfo newMealInfo = new MealInfo();
        newMealInfo.setCalories(request.getCalories());
        newMealInfo.setCarbs(request.getCarbs());
        newMealInfo.setFat(request.getCarbs());
        newMealInfo.setUserId(request.getUserId());
        newMealInfo.setMealName(request.getMealName());
        newMealInfo.setProtein(request.getProtein());

        return mealInfoRepository.save(newMealInfo);
    }

    public MealInfo updateMealInfo(Integer mealId, MealInfoUpdateRequest request) {        
        MealInfo newMealInfo = mealInfoRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal info not found"));

        newMealInfo.setCalories(request.getCalories());
        newMealInfo.setCarbs(request.getCarbs());
        newMealInfo.setFat(request.getCarbs());
        newMealInfo.setUserId(request.getUserId());
        newMealInfo.setMealName(request.getMealName());
        newMealInfo.setProtein(request.getProtein());

        return mealInfoRepository.save(newMealInfo);
    }

    public void deleteMealInfo(Integer mealId) {        
        MealInfo mealInfo = mealInfoRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal info not found"));

        mealInfoRepository.delete(mealInfo);
    }
}
