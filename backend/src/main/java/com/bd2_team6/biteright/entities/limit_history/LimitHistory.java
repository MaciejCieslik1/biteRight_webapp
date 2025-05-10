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
    private Integer historyId;
    
    @Column(name = "date_changed")
    private String dateChanged;

    @Column(name = "calorie_limit")
    private Integer calorieLimit;

    @Column(name = "protein_limit")
    private Integer proteinLimit;

    @Column(name = "fat_limit")
    private Integer fatLimit;
    
    @Column(name = "carb_limit")
    private Integer carbLimit;
    
    @Column(name = "water_goal")
    private Integer waterGoal;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public LimitHistory(String dateChanged, User user, Integer calorieLimit, Integer fatLimit,
                        Integer carbLimit, Integer waterGoal) {
        this.dateChanged = dateChanged;
        this.user = user;
        this.calorieLimit = calorieLimit;
        this.fatLimit =  fatLimit;
        this.carbLimit = carbLimit;
        this.waterGoal = waterGoal;
    }
}
