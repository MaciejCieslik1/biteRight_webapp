package com.bd2_team6.biteright.entities.ingredient;
import org.springframework.data.repository.CrudRepository;
import java.io.Serializable;


public interface IngredientRepository extends CrudRepository<Ingredient, Serializable> {
    // This interface extends CrudRepository, which provides CRUD operations for the Ingredient entity.
    // You can add custom query methods here if needed.

    
    
}
