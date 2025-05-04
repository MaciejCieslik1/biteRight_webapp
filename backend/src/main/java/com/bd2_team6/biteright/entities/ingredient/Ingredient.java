package com.bd2_team6.biteright.entities.ingredient;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Integer ingredient_id;
    
    @Column(name = "name")
    private String name;       
    
    @Column(name = "brand")
    private String brand;
    
    @Column(name = "portion_size")
    private Integer portion_size;
    
    @Column(name = "calories")
    private Integer calories;
    
    @Column(name = "protein")
    private Integer protein;      
    
    @Column(name = "fat")
    private Integer fat; 
    
    @Column(name = "carbs")
    private Integer carbs;
    
    // CONSTRUCTORS
    public Ingredient() { }
    public Ingredient(String name, String brand, Integer portion_size, Integer calories, Integer protein, Integer fat, Integer carbs) {
        this.name = name;
        this.brand = brand;
        this.portion_size = portion_size;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }
    // GETTERS AND SETTERS
}
