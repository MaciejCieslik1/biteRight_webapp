package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.data_transfer_objects.RegistrationData;
import com.bd2_team6.biteright.controllers.data_transfer_objects.LoginData;
import com.bd2_team6.biteright.authentication.jason_web_token.JwtService;
import com.bd2_team6.biteright.entities.user.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    private final JwtService jwtService;
    
    @GetMapping("/testtoken")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("The token provided is valid :>>");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@RequestBody RegistrationData registrationData) {
        try {
            userService.registerNewUser(registrationData.getUsername(),registrationData.getEmail(), registrationData.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body("User registered successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exception caught during registration.\n" +e.getMessage());
        }
    } 

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginData loginData)  {
        try {
            userService.loginUser(loginData.getEmail(), loginData.getPassword());
            String token = jwtService.generateToken(loginData.getEmail());
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
            return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Exception caught during getting users.\n" +e.getMessage());
        }
    }

}
