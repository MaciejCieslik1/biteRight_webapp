package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.create_requests.ExerciseInfoCreateRequest;
import com.bd2_team6.biteright.controllers.requests.update_requests.ExerciseInfoUpdateRequest;
import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfo;
import com.bd2_team6.biteright.entities.exercise_info.ExerciseInfoRepository;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseInfoService {

    private final ExerciseInfoRepository exerciseInfoRepository;

    @Autowired
    public ExerciseInfoService(ExerciseInfoRepository exerciseInfoRepository) {
        this.exerciseInfoRepository = exerciseInfoRepository;
    }

    public Set<ExerciseInfo> findExerciseInfoByName(String name) {
        return exerciseInfoRepository.findByNameContainingIgnoreCase(name);
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

    public void deleteExerciseInfo(String name) {
        ExerciseInfo info = exerciseInfoRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Exercise with name '" + name + "' not found"));
        exerciseInfoRepository.delete(info);
    }
}
