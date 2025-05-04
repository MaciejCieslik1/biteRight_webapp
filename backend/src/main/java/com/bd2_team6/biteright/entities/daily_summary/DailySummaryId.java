package com.bd2_team6.biteright.entities.daily_summary;
import java.util.Date;
import java.util.Objects;

import jakarta.persistence.*;

@Embeddable
/// Class representing the double primary key of the DailySummary entity
public class DailySummaryId {
    @Column(name = "user_id")
    private Integer user_id;
    
    @Column(name = "summary_date")
    private Date summary_date;



    // CONSTRUCTOR
    public DailySummaryId() {}

    // EQUALS AND HASHCODE METHODS
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DailySummaryId that = (DailySummaryId) o;
        return  Objects.equals(user_id, that.user_id) && 
                Objects.equals(summary_date, that.summary_date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, summary_date);
    }


}
