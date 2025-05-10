package com.bd2_team6.biteright.entities.recipe_content;

import com.bd2_team6.biteright.entities.ingredient.Ingredient;
import com.bd2_team6.biteright.entities.recipe.Recipe;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recipe_content")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class RecipeContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_content_id")
    private Integer recipe_content_id;

    @Column(name = "recipe_id")
    private Integer recipe_id;

    @Column(name = "ingredient_id")
    private Integer ingredient_id;

    @Column(name = "ingredient_amount")
    private Integer ingredient_amount;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public RecipeContent(Integer recipe_id, Integer ingredient_id, Integer ingredient_amount) {
        this.recipe_id = recipe_id;
        this.ingredient_id = ingredient_id;
        this.ingredient_amount = ingredient_amount;
    }
}
