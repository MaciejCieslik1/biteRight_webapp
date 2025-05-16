package com.bd2_team6.biteright.controllers.data_transfer_objects;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class LoginRequestBody {
    private String email;
    private String password;
}
