package com.bd2_team6.biteright.authentication.custom_user_details;

import org.springframework.security.core.userdetails.*;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user.User;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty())
            throw new UsernameNotFoundException("User with email: " + email + " not found.");

        return new CustomUserDetails(userOpt.get());
    }
}
