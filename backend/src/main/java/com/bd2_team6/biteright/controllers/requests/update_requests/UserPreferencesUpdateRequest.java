package com.bd2_team6.biteright.controllers.requests.update_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferencesUpdateRequest {
    String language;
    Boolean darkMode;
    Boolean font;
    Boolean notifications;
}
