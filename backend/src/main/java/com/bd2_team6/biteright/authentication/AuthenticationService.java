package com.bd2_team6.biteright.authentication;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public void registerNewUser(String username, String email, String password) throws Exception {
        validateEmail(email);

        if (userRepository.findByUsername(username) != null)
            throw new Exception("Username already taken.");
        if (userRepository.findByEmail(email) != null)
            throw new Exception("Email already taken.");

        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(username, email, hashedPassword, "user");
        userRepository.save(newUser);
    }

    public void loginUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null)
            throw new Exception("User (with email"+ email + ") not found.");
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password)); 
        if (auth == null || !auth.isAuthenticated()) throw new Exception("Invalid password.");
        else System.out.println("User authenticated successfully.");
    }

    public void validateEmail(String email) throws Exception {
        String correctRegex = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        if (email == null || !email.matches(correctRegex)) {
            throw new Exception("Invalid email");
        }
    }

    public String getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) return "No users found.";
        else {
            String userslist = "";
            for (User user : users) {
                userslist += user.getUsername() + " " + user.getEmail() + "\n";
            }
            return userslist;
        }
    }
    
}
