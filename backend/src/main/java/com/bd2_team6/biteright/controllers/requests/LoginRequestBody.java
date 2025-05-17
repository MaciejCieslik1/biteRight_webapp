package com.bd2_team6.biteright.controllers.requests;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class LoginRequestBody {
    private String email;
    private String password;
}
