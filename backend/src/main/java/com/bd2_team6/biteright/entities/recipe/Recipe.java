package com.bd2_team6.biteright.entities.recipe;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@NoArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Integer recipe_id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    public Recipe(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
