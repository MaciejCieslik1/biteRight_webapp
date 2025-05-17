package com.bd2_team6.biteright.authentication.custom_user_details;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import com.bd2_team6.biteright.entities.user.User;
import java.util.Collections;
import java.util.Collection;

public class CustomUserDetails  implements UserDetails {
    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(this.user.getType()));
    }

    @Override
    public String getPassword() {
        return this.user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    public String getEmail() {
        return this.user.getEmail();
    }
    
}
