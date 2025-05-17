package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.create_requests.AddressCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.AddressUpdateRequest;
import com.bd2_team6.biteright.entities.address.Address;
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
    public ResponseEntity<?> findAddress(Authentication authentication) {
        String username = authentication.getName();

        try {
            Set<Address> addresses = addressService.findAddressesByUsername(username);
            return ResponseEntity.ok(addresses);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/createAddress")
    public ResponseEntity<?> addAddress(Authentication authentication, @RequestBody AddressCreateRequest request) {
        String username = authentication.getName();

        try {
            Address newAddress = addressService.createAddress(username, request);
            return ResponseEntity.ok(newAddress);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<?> updateAddress(Authentication authentication, @RequestBody AddressUpdateRequest request, @PathVariable("id") Integer addressId) {
        String username = authentication.getName();

        try {
            Address updatedAddress = addressService.updateAddress(username, request, addressId);
            return ResponseEntity.ok(updatedAddress);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteAddress/{id}")
    public ResponseEntity<?> deleteAddress(Authentication authentication, @PathVariable("id") Integer addressId) {
        String username = authentication.getName();

        try {
            addressService.deleteAddressById(username, addressId);
            return ResponseEntity.ok("Address deleted successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
