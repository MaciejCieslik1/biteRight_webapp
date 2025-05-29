package com.bd2_team6.biteright.controllers.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserExerciseDTO {
    private int id;
    private int userId;
    private int exerciseInfoId;
    private LocalDateTime activityDate;
    private int duration;
    private int caloriesBurnt;
}
