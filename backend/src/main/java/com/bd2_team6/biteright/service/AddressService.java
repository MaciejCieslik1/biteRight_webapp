package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.address.Address;
import com.bd2_team6.biteright.entities.address.AddressRepository;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    private final UserRepository userRepository;

    @Autowired
    public AddressService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Set<Address> findAddressesByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getAddresses();
    }
}
