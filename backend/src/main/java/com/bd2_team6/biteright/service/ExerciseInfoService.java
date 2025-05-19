package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.create_requests.ExerciseInfoCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.ExerciseInfoUpdateRequest;
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

    public ExerciseInfo findExerciseInfoByName(String name) {
        return exerciseInfoRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Exercise with name '" + name + "' not found"));
    }

    public ExerciseInfo createExerciseInfo(ExerciseInfoCreateRequest request) {
        ExerciseInfo newInfo = new ExerciseInfo();
        newInfo.setMetabolicEquivalent(request.getMetabolicEquivalent());
        newInfo.setName(request.getName());
        return exerciseInfoRepository.save(newInfo);
    }

    public ExerciseInfo updateExerciseInfo(String name, ExerciseInfoUpdateRequest request) {
        ExerciseInfo newInfo = exerciseInfoRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Exercise with name '" + name + "' not found"));
        newInfo.setMetabolicEquivalent(request.getMetabolicEquivalent());
        newInfo.setName(request.getName());
        return exerciseInfoRepository.save(newInfo);
    }
}
