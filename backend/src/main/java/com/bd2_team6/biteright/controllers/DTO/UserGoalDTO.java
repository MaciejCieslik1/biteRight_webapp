package com.bd2_team6.biteright.controllers.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGoalDTO {
    private Integer id;
    private String goalType;
    private Float goalWeight;
    private LocalDate deadline;
}
