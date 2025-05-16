package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfo;
import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseInfoService {

    private final ExerciseInfoRepository exerciseInfoRepository;

    @Autowired
    public ExerciseInfoService(ExerciseInfoRepository exerciseInfoRepository) {
        this.exerciseInfoRepository = exerciseInfoRepository;
    }

    public ExerciseInfo findByName(String name) {
        return exerciseInfoRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Exercise with name '" + name + "' not found"));
    }
}
