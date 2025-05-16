package com.bd2_team6.biteright.controllers;

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

    @GetMapping("/findExerciseInfo")
    public ResponseEntity<?> getExerciseInfoByName(@RequestParam String name) {
        try {
            ExerciseInfo info = exerciseInfoService.findByName(name);
            return ResponseEntity.ok(info);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
