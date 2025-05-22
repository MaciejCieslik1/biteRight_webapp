package com.bd2_team6.biteright.controllers.requests.update_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class DailyLimitsUpdateRequest {
    private Integer calorieLimit;
    private Integer proteinLimit;
    private Integer fatLimit;  
    private Integer carbLimit;  
    private Integer waterGoal;  
}