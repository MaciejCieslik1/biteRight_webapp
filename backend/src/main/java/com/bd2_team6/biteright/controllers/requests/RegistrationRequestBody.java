package com.bd2_team6.biteright.controllers.requests;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class RegistrationRequestBody {
    private String username;
    private String password;
    private String email;
}
