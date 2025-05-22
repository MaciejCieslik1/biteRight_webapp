package com.bd2_team6.biteright.controllers.requests.create_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class DailyLimitsCreateRequest {
    private Integer calorieLimit;
    private Integer proteinLimit;
    private Integer fatLimit;  
    private Integer carbLimit;  
    private Integer waterGoal;  
}