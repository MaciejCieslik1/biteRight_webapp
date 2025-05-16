package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.daily_limits.DailyLimits;
import com.bd2_team6.biteright.entities.daily_limits.DailyLimitsRepository;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DailyLimitsService {
    private final UserRepository userRepository;
    private final DailyLimitsRepository dailyLimitsRepository;

    @Autowired
    public DailyLimitsService(UserRepository userRepository, DailyLimitsRepository dailyLimitsRepository) {
        this.userRepository = userRepository;
        this.dailyLimitsRepository = dailyLimitsRepository;
    }

    public DailyLimits findDailyLimitsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getDailyLimits();
    }
}
