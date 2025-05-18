package com.bd2_team6.biteright.authentication;

import com.bd2_team6.biteright.entities.user_goal.UserGoal;
import com.bd2_team6.biteright.entities.user_goal.UserGoalRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import com.bd2_team6.biteright.entities.user_info.UserInfoRepository;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferences;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferencesRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final UserGoalRepository userGoalRepository;
    private final UserInfoRepository userInfoRepository;
    private final UserPreferencesRepository userPreferencesRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public void registerNewUser(String username, String email, String password) throws Exception {
        validateEmail(email);

        Optional<User> userOptByUsername = userRepository.findByUsername(username);
        Optional<User> userOptByEmail = userRepository.findByEmail(email);

        if (userOptByUsername.isPresent())
            throw new Exception("Username already taken.");
        if (userOptByEmail.isPresent())
            throw new Exception("Email already taken.");

        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(username, email, hashedPassword, "user");
        userRepository.save(newUser);
        UserGoal newUserGoal = new UserGoal("Lose weight", 75f, LocalDate.parse("2025-10-01"));
        userGoalRepository.save(newUserGoal);
        UserInfo userInfo = new UserInfo(newUser, newUserGoal, "John", "Doe", 25, 80f,
                180, "active", 24.69f);
        userInfoRepository.save(userInfo);
        UserPreferences newUserPreferences = new UserPreferences(newUser, "english", true, true,
                true);
        userPreferencesRepository.save(newUserPreferences);
    }

    public void loginUser(String email, String password) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty())
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
            String usersList = "";
            for (User user : users) {
                usersList += user.getUsername() + " " + user.getEmail() + "\n";
            }
            return usersList;
        }
    }
    
}
