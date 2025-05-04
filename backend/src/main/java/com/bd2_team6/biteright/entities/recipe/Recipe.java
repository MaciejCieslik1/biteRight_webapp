package com.bd2_team6.biteright.entities.recipe;

import jakarta.persistence.*;

@Entity
@Table(name = "recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Integer recipe_id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    // CONSTRUCTORS
    public Recipe() {     }
    public Recipe(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // GETTERS AND SETTERS
}
