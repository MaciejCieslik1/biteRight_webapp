package com.bd2_team6.biteright.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class EmailSendingService {
    @Autowired
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailSender;

    public void sendVerificationEmail(String username, String email, String verificationCode) {
        String subject = "BiteRight - Email Verification";
        String path = "http://localhost:80/verifyuser/" + email + "/" + verificationCode; 
        String body = "Hello, " + username + "!\nThank you for registering in BiteRight!\nPlease click the link below to verify your email address.";

        sendEmail(email, verificationCode, subject, path, body);
    }

    public void sendForgotPasswordEmail(String username, String email, String forgottenPasswordCode){
        String subject = "BiteRight - Forgotten password";
        String path = "http://localhost:80/forgottenpassword/" + email + "/" + forgottenPasswordCode; 
        String body = "Hello, " + username + 
                    "!\nIf you requested to reset your password, please click the link below to complete the process.\n"+
                    "If it wasn't you then ignore this email.";
        sendEmail(email, forgottenPasswordCode, subject, path, body);
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

    public String generateVeryficationCode() {
        SecureRandom random = new SecureRandom();
        int code = random.nextInt(100_000_000); 
        return String.format("%08d", code);   
    }
}