package com.bd2_team6.biteright.controllers.requests.create_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeightHistoryCreateRequest {
    LocalDateTime measurementDate;
    Float weight;
}
