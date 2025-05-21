package com.bd2_team6.biteright.controllers.requests.update_requests;

import java.time.LocalDateTime;
import java.util.List;

import com.bd2_team6.biteright.controllers.DTO.MealContentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class MealUpdateRequest {
    private Integer userId;
    private Integer mealTypeId;
    private String name;
    private String description;
    private LocalDateTime mealDate;
    private List<MealContentDTO> contents;
}
