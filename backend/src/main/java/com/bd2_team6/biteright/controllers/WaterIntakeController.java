package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.create_requests.WaterIntakeCreateRequest;
import com.bd2_team6.biteright.entities.water_intake.WaterIntake;
import com.bd2_team6.biteright.service.WaterIntakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/waterIntake")
@RequiredArgsConstructor
public class WaterIntakeController {

    private final WaterIntakeService waterIntakeService;

    @PostMapping("/create")
    public ResponseEntity<?> createWaterIntake(Authentication authentication,
                                                         @RequestBody WaterIntakeCreateRequest request) {
        String username = authentication.getName();

        try {
            WaterIntake waterIntake = waterIntakeService.createWaterIntake(username, request);
            return ResponseEntity.ok(waterIntake);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findWaterIntakeForUser")
    public ResponseEntity<?> findWaterIntakeForUser(Authentication authentication,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size,
                                                    @RequestParam(defaultValue = "id") String sortBy) {
        String username = authentication.getName();

        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            Page<WaterIntake> waterIntakes = waterIntakeService.findWaterIntakesByUsername(username, pageable);
            return ResponseEntity.ok(waterIntakes);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findWaterIntakeByDate/{date}")
    public ResponseEntity<?> findWaterIntakesByDate(Authentication authentication,
                            @RequestParam(defaultValue = "0") int page,
                            @RequestParam(defaultValue = "10") int size,
                            @RequestParam(defaultValue = "id") String sortBy,
                            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        String username = authentication.getName();

        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            Page<WaterIntake> waterIntakes = waterIntakeService.findWaterIntakesByDate(username, date, pageable);
            return ResponseEntity.ok(waterIntakes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findLastWaterIntakeByDate/{date}")
    public ResponseEntity<?> findLastWaterIntakesByDate(Authentication authentication,
                            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        String username = authentication.getName();

        try {
            WaterIntake waterIntake = waterIntakeService.findLastWaterIntakeByUsername(username);
            return ResponseEntity.ok(waterIntake);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findWaterIntakeById/{id}")
    public ResponseEntity<?> findWaterIntakeById(Authentication authentication, @PathVariable("id") int waterIntakeId) {
        String username = authentication.getName();

        try {
            WaterIntake waterIntake = waterIntakeService.findWaterIntakeById(username, waterIntakeId);
            return ResponseEntity.ok(waterIntake);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteWaterIntake(Authentication authentication, @PathVariable("id") int waterIntakeId) {
        String username = authentication.getName();

        try {
            waterIntakeService.deleteWaterIntakeById(username, waterIntakeId);
            return ResponseEntity.ok("Water intake deleted successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
