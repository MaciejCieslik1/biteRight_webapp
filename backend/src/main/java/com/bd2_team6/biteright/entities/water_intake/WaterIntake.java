package com.bd2_team6.biteright.entities.water_intake;
import com.bd2_team6.biteright.entities.user.User;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "water_intake")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class WaterIntake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "water_intake_id")
    private Integer water_intake_id;

    @Column(name = "intake_date")
    private Date intake_date;    

    @Column(name = "user_id")
    private Integer user_id; 
    
    @Column(name = "water_amount")
    private Integer water_amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public WaterIntake(Date intake_date, Integer user_id, Integer water_amount) {
        this.intake_date = intake_date;
        this.user_id = user_id;
        this.water_amount = water_amount;
    }
}
