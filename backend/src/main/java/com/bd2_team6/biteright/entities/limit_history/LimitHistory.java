package com.bd2_team6.biteright.entities.limit_history;

import com.bd2_team6.biteright.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "limit_history")
@Getter
@Setter
@NoArgsConstructor
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
    private Integer calorie_limit;

    @Column(name = "protein_limit")
    private Integer protein_limit;

    @Column(name = "fat_limit")
    private Integer fat_limit;
    
    @Column(name = "carb_limit")
    private Integer carb_limit;
    
    @Column(name = "water_goal")
    private Integer water_goal;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public LimitHistory(String data_changed, Integer user_id, Integer calorie_limit, Integer fat_limit,
                        Integer carb_limit, Integer water_goal) {
        this.date_changed = data_changed;
        this.user_id = user_id;
        this.calorie_limit = calorie_limit;
        this.fat_limit =  fat_limit;
        this.carb_limit = carb_limit;
        this.water_goal = water_goal;
    }
}
