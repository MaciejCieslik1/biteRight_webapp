package com.bd2_team6.biteright.entities.user_preferences;

import jakarta.persistence.*;

@Entity
@Table(name = "user_preferences")
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
    
    
    // CONSTRUCTORS
    public UserPreferences() {     }
    public UserPreferences(Integer user_id, String language, Boolean darkmode, Boolean font, Boolean notifications) {
        this.user_id = user_id;
        this.language = language;
        this.darkmode = darkmode;
        this.font = font;
        this.notifications = notifications;
    }
    
    // GETTERS AND SETTERS
}
