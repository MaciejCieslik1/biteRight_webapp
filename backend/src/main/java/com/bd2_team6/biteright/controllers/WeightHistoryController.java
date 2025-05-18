package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.DTO.WeightHistoryDTO;
import com.bd2_team6.biteright.controllers.requests.create_requests.WeightHistoryCreateRequest;
import com.bd2_team6.biteright.entities.weight_history.WeightHistory;
import com.bd2_team6.biteright.service.WeightHistoryService;
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
@RequestMapping("/weightHistory")
@RequiredArgsConstructor
public class WeightHistoryController {

    private final WeightHistoryService weightHistoryService;

    @PostMapping("/create")
    public ResponseEntity<?> createWaterIntake(Authentication authentication,
                                               @RequestBody WeightHistoryCreateRequest request) {
        String username = authentication.getName();

        try {
            WeightHistory weightHistory = weightHistoryService.createWeightHistory(username, request);
            return ResponseEntity.ok(mapToDTO(weightHistory));
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findWeightHistoriesForUser")
    public ResponseEntity<?> findWeightHistoriesForUser(Authentication authentication,
                                                      @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size,
                                                      @RequestParam(defaultValue = "measurementDate") String sortBy) {
        String username = authentication.getName();

        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            Page<WeightHistory> weightHistories = weightHistoryService.findWeightHistoriesByUsername(username, pageable);
            return ResponseEntity.ok(mapToDTOPage(weightHistories));
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findWeightHistoriesByDate/{date}")
    public ResponseEntity<?> findWeightHistoriesByDate(Authentication authentication,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size,
                                                     @RequestParam(defaultValue = "measurementDate") String sortBy,
                                                     @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                         LocalDate date) {
        String username = authentication.getName();

        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            Page<WeightHistory> weightHistories = weightHistoryService.findWeightHistoriesByDate(username, date, pageable);
            return ResponseEntity.ok(mapToDTOPage(weightHistories));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findLastWeightHistoryByDate/{date}")
    public ResponseEntity<?> findLastWaterIntakesByDate(Authentication authentication,
                                                        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        String username = authentication.getName();

        try {
            WeightHistory weightHistory = weightHistoryService.findLastWeightHistoryByUsername(username);
            return ResponseEntity.ok(mapToDTO(weightHistory));
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findWeightHistoryById/{id}")
    public ResponseEntity<?> findWeightHistoryById(Authentication authentication, @PathVariable("id") int weightHistoryId) {
        String username = authentication.getName();

        try {
            WeightHistory weightHistory = weightHistoryService.findWeightHistoryById(username, weightHistoryId);
            return ResponseEntity.ok(mapToDTO(weightHistory));
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteWeightHistory(Authentication authentication, @PathVariable("id") int weightHistoryId) {
        String username = authentication.getName();

        try {
            weightHistoryService.deleteWeightHistoryById(username, weightHistoryId);
            return ResponseEntity.ok("Weight history deleted successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private WeightHistoryDTO mapToDTO(WeightHistory weightHistory) {
        return new WeightHistoryDTO(weightHistory.getWeightId(), weightHistory.getMeasurementDate(),
                weightHistory.getWeight());
    }

    private Page<WeightHistoryDTO> mapToDTOPage(Page<WeightHistory> page) {
        return page.map(this::mapToDTO);
    }
}
