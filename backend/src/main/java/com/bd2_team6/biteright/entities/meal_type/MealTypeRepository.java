package com.bd2_team6.biteright.entities.meal_type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MealTypeRepository extends JpaRepository<MealType, Integer> {
    
}
