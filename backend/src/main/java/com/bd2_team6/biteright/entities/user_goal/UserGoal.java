package com.bd2_team6.biteright.entities.user_goal;
import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "user_goal")
public class UserGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_goal_id")
    private Integer user_goal_id;

    @Column(name = "goal_type")
    private String goal_type;

    @Column(name = "goal_weight")
    private Float goal_weight;

    @Column(name = "deadline")
    private Date deadline;

    // CONSTRUCTORS
    public UserGoal() { }
    public UserGoal(String goal_type, Float goal_weight, Date deadline) {
        this.goal_type = goal_type;
        this.goal_weight = goal_weight;
        this.deadline = deadline;
    }
    // GETTERS AND SETTERS
}
