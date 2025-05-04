package com.bd2_team6.biteright.entities.meal_info;
import org.hibernate.annotations.Immutable;
import jakarta.persistence.*;

@Entity
@Immutable
@Table(name = "meal_info")
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

    // CONSTRUCTOR
    public MealInfo() {}
}
