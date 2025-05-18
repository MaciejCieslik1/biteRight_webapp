package com.bd2_team6.biteright.authentication.jason_web_token;

import com.bd2_team6.biteright.authentication.custom_user_details.CustomUserDetails;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import io.jsonwebtoken.Jwts;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.token-valid-time}")
    private long JwtTokenValidTime;
    public final String secretKey;

    public JwtService() {
        try {
            KeyGenerator generator = KeyGenerator.getInstance("HmacSHA256");
            this.secretKey = Base64.getEncoder().encodeToString(generator.generateKey().getEncoded());
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate secret key", e);
        }
    }

    public boolean isTokenValid(String token, CustomUserDetails userDetails) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(userDetails.getEmail()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String email) {
        String token = Jwts
                .builder()
                .claim("email", email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JwtTokenValidTime))
                .issuer("biteRightApplication")
                .signWith(getSecretKey())
                .compact();
        return token;
    }
    
    private SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractEmail(String token) {
        return Jwts
                .parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("email", String.class);
    }

    private Date extractExpiration(String token) {
        return Jwts
                .parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }
}
