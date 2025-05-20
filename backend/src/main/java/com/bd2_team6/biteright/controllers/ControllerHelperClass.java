package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import org.springframework.security.core.Authentication;
import java.util.Optional;


public class ControllerHelperClass {

    public static String getUsernameFromAuthentication(Authentication authentication, UserRepository userRepository) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            return userOpt.get().getUsername();
        }
        else {
            throw new IllegalArgumentException("User not found");
        }
    }
}
