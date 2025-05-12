package com.bd2_team6.biteright.entities.user_goal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import com.bd2_team6.biteright.entities.user_info.UserInfo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_goal")
@Getter
@Setter
@NoArgsConstructor
public class UserGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_goal_id")
    private Integer userGoalId;

    @Column(name = "goal_type")
    private String goalType;

    @Column(name = "goal_weight")
    private Float goalWeight;

    @Column(name = "deadline")
    private Date deadline;

    @OneToMany(mappedBy = "userGoal", cascade = CascadeType.ALL)
    private Set<UserInfo> userInfos = new HashSet<>();

    public UserGoal(String goalType, Float goalWeight, Date deadline) {
        this.goalType = goalType;
        this.goalWeight = goalWeight;
        this.deadline = deadline;
    }
}
