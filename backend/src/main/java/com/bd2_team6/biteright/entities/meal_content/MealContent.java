package com.bd2_team6.biteright.entities.meal_content;

import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.entities.meal.Meal;
import com.bd2_team6.biteright.entities.recipe.Recipe;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "meal_content")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class MealContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_content_id")
    private Integer mealContentId;
    
    @Column(name = "ingredient_amount")
    private Integer ingredientAmount;

    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    public MealContent(Ingredient ingredient, Meal meal, Integer ingredientAmount) {
        this.ingredient = ingredient;
        this.meal = meal;
        this.ingredientAmount = ingredientAmount;
    }
}
