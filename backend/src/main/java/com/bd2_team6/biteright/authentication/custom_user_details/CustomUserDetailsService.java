package com.bd2_team6.biteright.authentication.custom_user_details;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user.User;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override 
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // We use email instead of username for authentication, 
        // so this implementation is not the best solution, but it is a temporary quick fix
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty())
            throw new UsernameNotFoundException("User with email: " + email + " not found.");
        
        return new CustomUserDetails(userOpt.get());
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty())
            throw new UsernameNotFoundException("User with email: " + email + " not found.");
        
        return new CustomUserDetails(userOpt.get());
    }
    
}
