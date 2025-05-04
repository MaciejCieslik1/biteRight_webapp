package com.bd2_team6.biteright.entities.meal_type;

import jakarta.persistence.*;

@Entity
@Table(name = "meal_type")
public class MealType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Integer type_id;

    @Column(name = "name")
    private String name;

    // CONSTRUCTORS
    public MealType() { }
    public MealType(String name) {
        this.name = name;
    }

    // GETTERS AND SETTERS
}
