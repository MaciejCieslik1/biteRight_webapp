package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.daily_limits.DailyLimitsRepository;
import com.bd2_team6.biteright.entities.daily_summary.DailySummary;
import com.bd2_team6.biteright.entities.daily_summary.DailySummaryRepository;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DailySummaryService {
    private final UserRepository userRepository;
    private final DailySummaryRepository dailySummaryRepository;

    @Autowired
    public DailySummaryService(UserRepository userRepository, DailySummaryRepository dailySummaryRepository) {
        this.userRepository = userRepository;
        this.dailySummaryRepository = dailySummaryRepository;
    }

    public DailySummary findDailySummaryByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Integer user_id = user.getId();
        DailySummary summary = dailySummaryRepository.findById(user_id)
                .orElseThrow(() -> new IllegalArgumentException("Summary not found"));
        return summary;
    }
}
