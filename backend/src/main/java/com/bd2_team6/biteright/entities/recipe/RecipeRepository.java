package com.bd2_team6.biteright.entities.recipe;
import org.springframework.data.repository.CrudRepository;
import java.io.Serializable;

public interface RecipeRepository extends CrudRepository<Recipe, Serializable>{
    
}
