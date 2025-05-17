package com.bd2_team6.biteright.entities.meal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MealRepository extends JpaRepository<Meal, Integer> {
    Optional<Meal> findByName(String name);
}
