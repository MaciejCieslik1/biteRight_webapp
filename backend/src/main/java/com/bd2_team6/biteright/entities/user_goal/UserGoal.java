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
    private Integer user_goal_id;

    @Column(name = "goal_type")
    private String goal_type;

    @Column(name = "goal_weight")
    private Float goal_weight;

    @Column(name = "deadline")
    private Date deadline;

    @OneToMany(mappedBy = "userGoal", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
                                                CascadeType.REFRESH})
    private Set<UserInfo> userInfos = new HashSet<>();

    public UserGoal(String goal_type, Float goal_weight, Date deadline) {
        this.goal_type = goal_type;
        this.goal_weight = goal_weight;
        this.deadline = deadline;
    }
}
