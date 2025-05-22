package com.bd2_team6.biteright.entities.meal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Integer> {
    Optional<Meal> findByName(String name);

    @Query("SELECT m FROM Meal m WHERE m.user.username = :username AND m.name = :name")
    Optional<Meal> findByUsernameAndName(@Param("username") String username, @Param("name") String name);

    @Query("SELECT m FROM Meal m WHERE m.user.username = :username AND m.mealId = :mealId")
    Optional<Meal> findByUsernameAndMealId(@Param("username") String username, @Param("mealId") Integer mealId);
}
