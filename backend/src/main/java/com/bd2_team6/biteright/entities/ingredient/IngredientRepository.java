package com.bd2_team6.biteright.entities.ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    Set<Ingredient> findByNameContainingIgnoreCase(String name);
    Optional<Ingredient> findByName(String name);
}
