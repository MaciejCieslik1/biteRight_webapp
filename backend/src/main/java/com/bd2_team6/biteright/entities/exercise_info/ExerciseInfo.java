package com.bd2_team6.biteright.entities.exercise_info;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercise_info")
@Getter
@Setter
@NoArgsConstructor
public class ExerciseInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Integer exercise_id;

    @Column(name = "metabolic_equivalent")
    private Float metabolic_equivalent;

    @Column(name = "name")
    private String name;

    public ExerciseInfo(Float metabolic_equivalent, String name) {
        this.metabolic_equivalent = metabolic_equivalent;
        this.name = name;
    }
}
