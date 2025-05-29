package com.bd2_team6.biteright.controllers.requests;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
}
