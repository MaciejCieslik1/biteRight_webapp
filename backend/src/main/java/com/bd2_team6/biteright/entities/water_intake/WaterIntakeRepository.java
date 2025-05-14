package com.bd2_team6.biteright.entities.water_intake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Integer> {
    
}
