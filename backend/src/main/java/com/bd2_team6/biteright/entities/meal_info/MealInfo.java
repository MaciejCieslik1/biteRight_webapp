package com.bd2_team6.biteright.entities.meal_info;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Immutable;
import jakarta.persistence.*;

@Entity
@Immutable
@Table(name = "meal_info")
@Getter
@Setter
@NoArgsConstructor
public class MealInfo {
    @Id
    @Column(name = "meal_id")
    private Integer meal_id;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "meal_name")
    private String meal_name;

    @Column(name = "calories")
    private Float calories;

    @Column(name = "protein")
    private Float protein;

    @Column(name = "fat")
    private Float fat;

    @Column(name = "carbs")
    private Float carbs;

    public MealInfo(Integer user_id, String meal_name, Float calories, Float protein, Float fat, Float carbs) {
        this.user_id = user_id;
        this.meal_name = meal_name;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }
}
