package com.bd2_team6.biteright.entities.meal;
import com.bd2_team6.biteright.entities.meal_content.MealContent;
import com.bd2_team6.biteright.entities.meal_type.MealType;
import com.bd2_team6.biteright.entities.user.User;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "meal")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private Integer meal_id;
    
    @Column(name = "user_id")
    private Integer user_id;
    
    @Column(name = "meal_type_id")
    private Integer meal_type_id;

    @Column(name = "meal_date")
    private Date meal_date;   

    @Column(name = "name")
    private String name;
    
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private Set<MealContent> mealContents = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private MealType mealType;

    public Meal(Integer user_id, Integer meal_type_id, Date meal_date, String name, String description) {
        this.user_id = user_id;
        this.meal_type_id = meal_type_id;
        this.meal_date = meal_date;
        this.name = name;
        this.description = description;
    }
}
