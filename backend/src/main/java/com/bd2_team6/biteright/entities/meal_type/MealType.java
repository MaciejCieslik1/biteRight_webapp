package com.bd2_team6.biteright.entities.meal_type;

import com.bd2_team6.biteright.entities.meal.Meal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "meal_type")
@Getter
@Setter
@NoArgsConstructor
public class MealType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Integer typeId;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "mealType", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
                                                CascadeType.REFRESH})
    private Set<Meal> meals = new HashSet<>();

    public MealType(String name) {
        this.name = name;
    }
}
