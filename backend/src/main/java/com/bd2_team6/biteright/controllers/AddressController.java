package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.entities.address.Address;
import com.bd2_team6.biteright.entities.user_goal.UserGoal;
import com.bd2_team6.biteright.service.AddressService;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping("/findAddress")
    public ResponseEntity<?> findUserGoal(Authentication authentication) {
        String username = authentication.getName();

        try {
            Set<Address> addresses = addressService.findAddressesByUsername(username);
            return ResponseEntity.ok(addresses);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
