package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.user_goal.UserGoal;
import com.bd2_team6.biteright.entities.user_goal.UserGoalRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import com.bd2_team6.biteright.entities.user_info.UserInfoRepository;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferences;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferencesRepository;
import com.bd2_team6.biteright.entities.verification_code.VerificationCode;
import com.bd2_team6.biteright.entities.verification_code.VerificationCodeRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final UserGoalRepository userGoalRepository;
    private final UserInfoRepository userInfoRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final UserPreferencesRepository userPreferencesRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailSendingService emailService;


    public void registerNewUser(String username, String email, String password) throws Exception {
        validateEmail(email);

        Optional<User> userOptByUsername = userRepository.findByUsername(username);
        Optional<User> userOptByEmail = userRepository.findByEmail(email);

        if (userOptByUsername.isPresent())
            throw new Exception("Username " + username + " already taken.");

        if (userOptByEmail.isPresent())
            throw new Exception("Email "+ email +" already taken.");

        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(username, email, hashedPassword, "user");
        userRepository.save(newUser);
        UserGoal newUserGoal = new UserGoal("Lose weight", 75f, LocalDate.parse("2025-10-01"));
        userGoalRepository.save(newUserGoal);
        UserInfo userInfo = new UserInfo(newUser, newUserGoal, "John", "Doe", 25, 80f,
                180, "active", 24.69f);
        userInfoRepository.save(userInfo);
        UserPreferences newUserPreferences = new UserPreferences(newUser, "english", true, "arial",
                true);
        userPreferencesRepository.save(newUserPreferences);

        String code = emailService.generateVeryficationCode();
        LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(60); 
        VerificationCode newCode = new VerificationCode(code, expirationDate, newUser);
        verificationCodeRepository.save(newCode);

        emailService.sendVerificationEmail(newUser.getUsername(), newUser.getEmail(), code);
    }

    
    public void loginUser(String email, String password) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty())
            throw new Exception("User with email "+ email + " not found.");

        if (!user.get().getIsVerified()) 
            throw new Exception("User with email " + email + " is not verified. Please check your email for the verification link.");

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
                usersList += user.getUsername() + " " + user.getEmail() + " " + user.getIsVerified() + " " + user.getVerificationCode().getCode()+"\n";
            }
            return usersList;
        }
    }

    public void verifyUser(String email, String recivedVerificationCode) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.isPresent()) 
            throw new RuntimeException("User with email " + email + " not found.");
        
        User user = userOpt.get();
        if (user.getIsVerified())
            throw new RuntimeException("User with email " + email + " is already verified.");
        Optional<VerificationCode> codeOpt = verificationCodeRepository.findByUser(user);
        if (codeOpt.isEmpty())
            throw new RuntimeException("Verification code for user with email "+ email + " not found.");

        VerificationCode correctVerificationCode = codeOpt.get();
        if (!correctVerificationCode.getCode().equals(recivedVerificationCode)) 
            throw new RuntimeException("Invalid verification code for user with email " + email + ".");
        
        if (correctVerificationCode.isExpired()) {
            correctVerificationCode.setCode(emailService.generateVeryficationCode());
            correctVerificationCode.setExpirationDate(LocalDateTime.now().plusMinutes(60));
            verificationCodeRepository.save(correctVerificationCode);
            emailService.sendVerificationEmail(user.getUsername(), email, correctVerificationCode.getCode());
            throw new RuntimeException("Verification code for user with email " + email + " has expired. We have sent you another verification email.");
        }
        
        user.setIsVerified(true);
        userRepository.save(user);
        System.out.println("User with email " + email + " verified successfully.");
    }

    public void changeUsername(String email, String newUsername) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.isPresent()) 
            throw new RuntimeException("User with email " + email + " not found.");
        User user = userOpt.get();
        user.setUsername(newUsername);
        userRepository.save(user);
        System.out.println("Email for user with email " + email + " changed to " + newUsername + ".");
    }
    
    public void changeEmail(String email, String newEmail) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.isPresent()) 
            throw new RuntimeException("User with email " + email + " not found.");
        User user = userOpt.get();
        validateEmail(newEmail);
        user.setEmail(newEmail);
        userRepository.save(user);
        System.out.println("Email for user with email " + email + " changed to " + newEmail + ".");
    }

    public void changePassword(String email, String oldPassword,  String newPassword) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.isPresent()) 
            throw new RuntimeException("User with email " + email + " not found.");
        
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, oldPassword)); 
        
        if (auth == null || !auth.isAuthenticated()) 
            throw new RuntimeException("Invalid password for user with email " + email + ".");

        User user = userOpt.get();
        String newHashedPassword = passwordEncoder.encode(newPassword);
        user.setPasswordHash(newHashedPassword);
        userRepository.save(user);
        System.out.println("Password for user with email " + email + " changed successfully.");
    }

    public void manageForgottenPassword(String email) throws RuntimeException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent())
            throw new RuntimeException("User with email " + email +" was not found.");
        User user = userOpt.get();
        emailService.sendForgotPasswordEmail(user.getUsername(), email, user.getForgottenPasswordCode());
    }

    public void verifyForgottenPasswordCode(String email, String ForgottenPasswordCode) throws RuntimeException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent())
            throw new RuntimeException("User with email " + email +" was not found.");
        User user = userOpt.get();

        if (!ForgottenPasswordCode.equals(user.getForgottenPasswordCode()))
            throw new RuntimeException("Incorrect reset code provided.\n");
    }

    public void resetForgottenPassword(String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent())
            throw new RuntimeException("User with email " + email +" was not found.");
        User user = userOpt.get();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        System.out.println("Succesfully changed user's password.\n");
    }
}
