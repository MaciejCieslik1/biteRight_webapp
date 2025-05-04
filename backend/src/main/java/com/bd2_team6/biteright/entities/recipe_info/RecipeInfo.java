package com.bd2_team6.biteright.entities.recipe_info;
import org.hibernate.annotations.Immutable;
import jakarta.persistence.*;

@Entity
@Immutable
@Table(name = "recipe_info")
public class RecipeInfo {
    @Id
    @Column(name = "recipe_id")
    private Integer recipe_id;
    
    @Column(name = "recipe_name")
    private String recipe_name;
    
    @Column(name = "calories")
    private Double calories;
    
    @Column(name = "protein")
    private Double protein;
    
    @Column(name = "fat")
    private Double fat;
    
    @Column(name = "carbs")
    private Double carbs;
    
    // CONSTRUCTOR
    public RecipeInfo() {}
    
    // GETTERS AND SETTERS
}
