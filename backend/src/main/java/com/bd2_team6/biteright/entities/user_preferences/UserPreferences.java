package com.bd2_team6.biteright.entities.user_preferences;

import com.bd2_team6.biteright.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_preferences")
@Getter
@Setter
@NoArgsConstructor
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_preferences_id")
    private Integer user_preferences_id;

    @Column(name = "user_id")
    private Integer user_id; 
    
    @Column(name = "language")
    private String language;  
    
    @Column(name = "darkmode")
    private Boolean darkmode; 
    
    @Column(name = "font")
    private Boolean font; 
    
    @Column(name = "notifications")
    private Boolean notifications; 

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public UserPreferences(Integer user_id, String language, Boolean darkmode, Boolean font, Boolean notifications) {
        this.user_id = user_id;
        this.language = language;
        this.darkmode = darkmode;
        this.font = font;
        this.notifications = notifications;
    }
}
