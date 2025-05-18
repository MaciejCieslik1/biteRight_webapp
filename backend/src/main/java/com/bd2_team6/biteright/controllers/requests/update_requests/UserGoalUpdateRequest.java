package com.bd2_team6.biteright.controllers.requests.update_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGoalUpdateRequest {
    private String goalType;
    private Float goalWeight;
    private LocalDate goalDate;
}
