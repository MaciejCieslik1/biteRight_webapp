package com.bd2_team6.biteright.entities.meal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bd2_team6.biteright.entities.user.User;

@Repository
public interface MealRepository extends JpaRepository<Meal, Integer> {
    Optional<Meal> findByName(String name);
    Optional<Meal> findByUserAndName(User user, String name);
    Optional<Meal> findByUserandMealId(User user, Integer mealId);
}
