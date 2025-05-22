package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.create_requests.ExerciseInfoCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.ExerciseInfoUpdateRequest;
import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfo;
import com.bd2_team6.biteright.service.ExerciseInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exerciseInfo")
@RequiredArgsConstructor
public class ExerciseInfoController {
    private final ExerciseInfoService exerciseInfoService;

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findExerciseInfo(@PathVariable("name") String exerciseName) {
        try {
            ExerciseInfo info = exerciseInfoService.findExerciseInfoByName(exerciseName);
            return ResponseEntity.ok(info);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createExerciseInfo(@RequestBody ExerciseInfoCreateRequest request){
        try {
            ExerciseInfo newInfo = exerciseInfoService.createExerciseInfo(request);
            return ResponseEntity.ok(newInfo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{name}") 
    public ResponseEntity<?> updateExerciseInfo(@PathVariable("name") String exerciseName, @RequestBody ExerciseInfoUpdateRequest request){
        try {
            ExerciseInfo updatedInfo = exerciseInfoService.updateExerciseInfo(exerciseName, request);
            return ResponseEntity.ok(updatedInfo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{name}") 
    public ResponseEntity<?> deleteExerciseInfo(@PathVariable("name") String exerciseName) {
        try {
            exerciseInfoService.deleteExerciseInfo(exerciseName);
            return ResponseEntity.ok("Exercise info delete successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
