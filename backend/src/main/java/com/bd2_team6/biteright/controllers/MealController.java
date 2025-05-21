package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.controllers.DTO.MealDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.MealCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.MealUpdateRequest;
import com.bd2_team6.biteright.entities.meal.Meal;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.service.MealService;

@RestController
@RequestMapping("/meal")
@RequiredArgsConstructor
public class MealController {
    private final MealService mealService;
    private final UserRepository userRepository;

    @GetMapping("/findUserMeals")
    public ResponseEntity<?> findUserMeals(Authentication authentication) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            Set<MealDTO> mealsDTO = mealService.findUserMealsByUsername(username);
            return ResponseEntity.ok(mealsDTO);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findMeal/{name}")
    public ResponseEntity<?> findMeal(Authentication authentication, @PathVariable("name") String name) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            MealDTO mealDTO = mealService.findMealByName(username, name);
            return ResponseEntity.ok(mealDTO);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create") 
    public ResponseEntity<?> findMeal(Authentication authentication, @RequestBody MealCreateRequest request) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            Meal meal = mealService.createMeal(username, request);
            MealDTO mealDTO = new MealDTO(meal);
            return ResponseEntity.ok(mealDTO);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMeal(Authentication authentication, @RequestBody MealUpdateRequest request, 
                                        @PathVariable("id") Integer mealId) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            Meal meal = mealService.updateMeal(username, request, mealId);
            MealDTO mealDTO = new MealDTO(meal);
            return ResponseEntity.ok(mealDTO);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMeal(Authentication authentication, @PathVariable("id") Integer mealId) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            mealService.deleteMeal(username, mealId);
            return ResponseEntity.ok("Meal successfully deleted");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
