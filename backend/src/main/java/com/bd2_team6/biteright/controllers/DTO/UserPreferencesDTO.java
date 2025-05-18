package com.bd2_team6.biteright.controllers.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferencesDTO {
    private int id;
    private String language;
    private Boolean darkmode;
    private Boolean font;
    private Boolean notifications;
}
