package com.bd2_team6.biteright.entities.weight_history;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WeightHistoryRepository extends JpaRepository<WeightHistory, Integer> {
    
}
