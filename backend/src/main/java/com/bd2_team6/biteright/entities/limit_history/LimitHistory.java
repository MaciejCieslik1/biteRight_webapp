package com.bd2_team6.biteright.entities.limit_history;

import jakarta.persistence.*;

public class LimitHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Integer history_id;  
    
    @Column(name = "date_changed")
    private String date_changed;

    @Column(name =" user_id")
    private Integer user_id;

    @Column(name = "calorie_limit")
    private Integer calorie_lilmit;

    @Column(name = "protein_limit")
    private Integer protein_limit;

    @Column(name = "fat_limit")
    private Integer fat_limit;
    
    @Column(name = "carb_limit")
    private Integer carb_limit;
    
    @Column(name = "water_goal")
    private Integer water_goal;    

    // CONSTRUCTORS
    public LimitHistory() {     }
    
}
