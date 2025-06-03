package com.bd2_team6.biteright.controllers.requests;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class PasswordResetRequest {
    public String email;
    public String code;
    public String newPassword;
}
