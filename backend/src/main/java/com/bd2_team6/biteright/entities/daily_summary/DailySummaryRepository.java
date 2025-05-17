package com.bd2_team6.biteright.entities.daily_summary;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DailySummaryRepository extends JpaRepository<DailySummary, DailySummaryId> {
    Optional<DailySummary> findById(Integer id);
}
