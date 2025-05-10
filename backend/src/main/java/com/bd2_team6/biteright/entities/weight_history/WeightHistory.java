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
    private Integer weight_id; 
    
    @Column(name = "user_id")
    private Integer user_id; 
    
    @Column(name = "measurement_date")
    private Date measurement_date;

    @Column(name = "weight")
    private Float weight;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public WeightHistory(Integer user_id, Date measurement_date, Float weight) {
        this.user_id = user_id;
        this.measurement_date = measurement_date;
        this.weight = weight;
    }
}
