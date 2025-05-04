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

    @Column(name="calories_burnt")
    private Integer calories_burnt;

    // CONSTRUCTOR
    public DailySummary() { }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
}
