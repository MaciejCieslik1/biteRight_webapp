package com.bd2_team6.biteright.controllers;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bd2_team6.biteright.controllers.DTO.MealDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.MealCreateRequest;
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
            Set<Meal> meals = mealService.findUserMealsByUsername(username);
            return ResponseEntity.ok(meals);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findMeal/{name}")
    public ResponseEntity<?> findMeal(Authentication authentication, @PathVariable("name") String name) {
        String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);

        try {
            Meal meal = mealService.findMealByName(username, name);
            MealDTO mealDTO = new MealDTO(meal);
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
            return ResponseEntity.ok(meal);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
