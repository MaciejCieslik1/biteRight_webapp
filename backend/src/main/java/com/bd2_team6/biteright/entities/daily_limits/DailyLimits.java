package com.bd2_team6.biteright.entities.daily_limits;

import jakarta.persistence.*;

@Entity
@Table(name = "daily_limits")
public class DailyLimits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_limit_id")
    private Integer daily_limit_id;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "calorie_limit")
    private Integer calorie_limit;

    @Column(name = "protein_limit")
    private Integer protein_limit;

    @Column(name = "fat_limit")
    private Integer fat_limit;

    @Column(name = "carb_limit")
    private Integer carb_limit;

    @Column(name = "water_goal")
    private Integer water_goal;   

    // CONSTRUCTORS
    public DailyLimits() {     }

    public DailyLimits(Integer user_id, Integer calorie_lilmit, Integer protein_limit, Integer fat_limit, Integer carb_limit, Integer water_goal) {
        this.user_id = user_id;
        this.calorie_limit = calorie_lilmit;
        this.protein_limit = protein_limit;
        this.fat_limit = fat_limit;
        this.carb_limit = carb_limit;
        this.water_goal = water_goal;
    }

    //GETTERS AND SETTERS
}
