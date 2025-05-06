package com.bd2_team6.biteright.entities.daily_summary;
import com.bd2_team6.biteright.entities.user.User;
import org.hibernate.annotations.Immutable;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Immutable
@Table(name = "daily_summary")
@IdClass(DailySummaryId.class)
public class DailySummary {
    @Id
    @Column(name = "user_id")
    private Integer user_id;

    @Id
    @Column(name = "summary_date")
    private Date summary_date;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "protein")
    private Integer protein;

    @Column(name = "fat")
    private Integer fat;

    @Column(name = "carbs")
    private Integer carbs;

    @Column(name="water_drank")
    private Integer water_drank;

    @Column(name="calories_burnt")
    private Integer calories_burnt;

    // CONSTRUCTOR
    public DailySummary() { }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    // GETTERS
    public Integer getUser_id() { return user_id;  }
    public Date getSummary_date() { return summary_date; }
    public Integer getCalories() { return calories; }
    public Integer getProtein() { return protein; }
    public Integer getCarbs() { return carbs; }
    public Integer getFat() { return fat; }

    public Integer getCalories_burnt() {         return calories_burnt;    }
    public Integer getWater_amount() {        return water_drank;  }

    @Override
    public String toString() {
        return "usr_id: "+ this.user_id + ", date: " + this.summary_date + ", calories " + this.calories + ", protein: " + this.protein + ", fat: " + this.fat + ", carbs: " + this.carbs + ", water: " + this.water_drank + ", calories burnt: " + this.calories_burnt;
    }
}
