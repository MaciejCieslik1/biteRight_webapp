package com.bd2_team6.biteright.entities.exercise_info;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExerciseInfoRepository  extends JpaRepository<ExerciseInfo, Integer> {
    Optional<ExerciseInfo> findByName(String name);
}
