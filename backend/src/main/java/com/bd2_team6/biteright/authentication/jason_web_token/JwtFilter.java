package com.bd2_team6.biteright.authentication.jason_web_token;

import com.bd2_team6.biteright.authentication.custom_user_details.CustomUserDetails;
import com.bd2_team6.biteright.authentication.custom_user_details.CustomUserDetailsService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.Authentication;
import org.springframework.context.ApplicationContext;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.ServletException;
import jakarta.servlet.FilterChain;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final ApplicationContext context;
    
    @Override
    protected void doFilterInternal(@NonNull  HttpServletRequest request, @NonNull  HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
                String authHeader = request.getHeader("Authorization");
                String token = null;
                String email = null;

                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    token = authHeader.substring(7);
                    email = jwtService.extractEmail(token);
                }

                if (email != null && SecurityContextHolder.getContext().getAuthentication()==null) {
                    CustomUserDetails userDetails = (CustomUserDetails) context.getBean(CustomUserDetailsService.class).loadUserByUsername(email);
                    if (jwtService.isTokenValid(token, userDetails)) {
                        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
                filterChain.doFilter(request, response);
            }

}
