package com.bd2_team6.biteright.entities.meal;

import java.sql.Date;

import org.springframework.jdbc.core.SqlReturnType;

import jakarta.persistence.*;

@Entity
@Table(name = "meal")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private Integer meal_id;
    
    @Column(name = "user_id")
    private Integer user_id;
    
    @Column(name = "meal_type_id")
    private Integer meal_type_id;

    @Column(name="meal_date")
    private Date meal_date;   

    @Column(name ="name")
    private String name;
    
    @Column(name="description")
    private String description;
    
    // CONSTRUCTORS
    public Meal() {     }

    public Meal(Integer user_id, Integer meal_type_id, Date meal_date, String name, String description) {
        this.user_id = user_id;
        this.meal_type_id = meal_type_id;
        this.meal_date = meal_date;
        this.name = name;
        this.description = description;
    }
}
