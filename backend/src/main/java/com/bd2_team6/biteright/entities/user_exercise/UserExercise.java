package com.bd2_team6.biteright.entities.user_exercise;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_exercise")
public class UserExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_exercise_id")
    private Integer user_exercise_id;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "exercise_info_id")
    private Integer exercise_info_id;

    @Column(name = "activity_date")
    private Date activity_date;

    @Column(name ="duration")
    private Integer duration;        

    @Column(name = "calories_burnt")
    private Integer calories_burnt; 
    
    // CONSTRUCTORS
    public UserExercise() {     }
    public UserExercise(Integer user_id, Integer exercise_info_id, Date activity_date, Integer duration, Integer calories_burnt) {
        this.user_id = user_id;
        this.exercise_info_id = exercise_info_id;
        this.activity_date = activity_date;
        this.duration = duration;
        this.calories_burnt = calories_burnt;
    }
    
    // GETTERS AND SETTERS
}
