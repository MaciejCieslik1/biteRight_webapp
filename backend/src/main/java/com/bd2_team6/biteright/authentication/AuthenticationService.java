package com.bd2_team6.biteright.authentication;

import com.bd2_team6.biteright.entities.user_goal.UserGoal;
import com.bd2_team6.biteright.entities.user_goal.UserGoalRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import com.bd2_team6.biteright.entities.user_info.UserInfoRepository;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferences;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferencesRepository;
import com.bd2_team6.biteright.entities.verification_code.VerificationCode;
import com.bd2_team6.biteright.entities.verification_code.VerificationCodeRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    @Autowired
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailSender;

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

        // Assign verification code
        String code = generateVeryficationCode();
        LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(60); 
        VerificationCode newCode = new VerificationCode(code, expirationDate, newUser);
        verificationCodeRepository.save(newCode);

        sendVerificationEmail(newUser.getUsername(), newUser.getEmail(), code);
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

    public void sendVerificationEmail(String username, String email, String verificationCode) {
        String subject = "BiteRight - Email Verification";
        String path = "http://localhost:80/verifyuser/" + email + "/" + verificationCode; 
        String body = "Hello, " + username + "!\nThank you for registering in BiteRight!\nPlease click the link below to verify your email address.";

        sendEmail(email, verificationCode, subject, path, body);
    }

    private void sendEmail (String email, String verificationCode, String subject, String path, String body) {
        try {
            String formattedBody = """
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9; text-align: center;">
                        <h2 style="color: #333;">%s</h2>
                        <p style="font-size: 16px; color: #555;">%s</p>
                        <a href="%s" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: #fff; background-color:rgb(98, 115, 224); text-decoration: none; border-radius: 5px;">Proceed</a>
                        <p style="font-size: 14px; color: #777;">Or copy and paste this link into your browser:</p>
                        <p style="font-size: 14px; color:rgb(98, 115, 224);">%s</p>
                        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply.</p>
                    </div>
                    """.formatted(subject, body, path, path);

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setFrom(emailSender); 
            helper.setSubject(subject);
            helper.setText(formattedBody, true); 
            javaMailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Error building verification URL: " + e.getMessage());
        }
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

    String generateVeryficationCode() {
        return "000000";
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
            correctVerificationCode.setCode(generateVeryficationCode());
            correctVerificationCode.setExpirationDate(LocalDateTime.now().plusMinutes(60));
            verificationCodeRepository.save(correctVerificationCode);
            sendVerificationEmail(user.getUsername(), email, correctVerificationCode.getCode());
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
}
