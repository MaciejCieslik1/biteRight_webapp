package com.bd2_team6.biteright.entities.user_info;
import jakarta.persistence.*;

@Entity
@Table(name = "user_info")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_info_id")
    private Integer user_info_id;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "user_goal_id")
    private Integer user_goal_id;

    @Column(name="name")
    private String name;
    
    @Column(name="surname")
    private String surname;
    
    @Column(name="age")
    private Integer age;
    
    @Column(name="weight")
    private Float weight; 
    
    @Column(name = "height")
    private Integer height; 
    
    @Column(name ="lifestyle")
    private String lifestyle; 

    @Column(name = "bmi")
    private Float bmi;      

    // CONSTRUCTORS
    public UserInfo() {     }
    public UserInfo(Integer user_id, Integer user_goal_id, String name, String surname, Integer age, Float weight, Integer height, String lifestyle, Float bmi) {
        this.user_id = user_id;
        this.user_goal_id = user_goal_id;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.lifestyle = lifestyle;
        this.bmi = bmi;
    }

    // GETTERS AND SETTERS
}
