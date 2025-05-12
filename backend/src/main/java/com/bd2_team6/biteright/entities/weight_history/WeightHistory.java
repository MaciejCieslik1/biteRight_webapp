package com.bd2_team6.biteright.entities.weight_history;
import com.bd2_team6.biteright.entities.user.User;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "weight_history")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class WeightHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weight_id")
    private Integer weightId;
    
    @Column(name = "measurement_date")
    private Date measurementDate;

    @Column(name = "weight")
    private Float weight;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public WeightHistory(User user, Date measurementDate, Float weight) {
        this.user = user;
        this.measurementDate = measurementDate;
        this.weight = weight;
    }
}
