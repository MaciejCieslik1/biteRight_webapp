package com.bd2_team6.biteright.entities.meal_type;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "meal_type")
@Getter
@Setter
@NoArgsConstructor
public class MealType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Integer type_id;

    @Column(name = "name")
    private String name;

    public MealType(String name) {
        this.name = name;
    }
}
