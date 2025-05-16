package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.data_transfer_objects.RegistrationRequestBody;
import com.bd2_team6.biteright.controllers.data_transfer_objects.LoginRequestBody;
import com.bd2_team6.biteright.authentication.AuthenticationService;
import com.bd2_team6.biteright.authentication.jason_web_token.JwtService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;
    private final JwtService jwtService;
    
    @GetMapping("/testtoken")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("The token provided is valid :>>");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@RequestBody RegistrationRequestBody registrationRequestBody) {
        try {
            authService.registerNewUser(registrationRequestBody.getUsername(),registrationRequestBody.getEmail(), registrationRequestBody.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body("User registered successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exception caught during registration.\n" +e.getMessage());
        }
    } 

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestBody loginRequestBody)  {
        try {
            authService.loginUser(loginRequestBody.getEmail(), loginRequestBody.getPassword());
            String token = jwtService.generateToken(loginRequestBody.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(token);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Exception caught during login.\n" +e.getMessage());
        }
    }

    @GetMapping("/getusers")
    public ResponseEntity<String> getUsers() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(authService.getAllUsers());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Exception caught during getting users.\n" +e.getMessage());
        }
    }

}
