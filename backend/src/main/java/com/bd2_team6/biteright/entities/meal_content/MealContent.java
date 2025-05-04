package com.bd2_team6.biteright.entities.meal_content;

import jakarta.persistence.*;

@Entity
@Table(name = "meal_content")
public class MealContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_content_id")
    private Integer meal_content_id; 
    
    @Column(name = "ingredient_id")
    private Integer ingredient_id; 
    
    @Column(name = "meal_id")
    private Integer meal_id;    
    
    @Column(name = "ingredient_amount")
    private Integer ingredient_amount;

    // CONSTRUCTORS
    public MealContent() {     }

    public MealContent(Integer ingredient_id, Integer meal_id, Integer ingredient_amount) {
        this.ingredient_id = ingredient_id;
        this.meal_id = meal_id;
        this.ingredient_amount = ingredient_amount;
    }

    // GETTERS AND SETTERS
}
