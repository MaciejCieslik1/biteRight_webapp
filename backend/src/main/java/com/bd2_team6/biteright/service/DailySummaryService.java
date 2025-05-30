package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.entities.daily_summary.DailySummary;
import com.bd2_team6.biteright.entities.daily_summary.DailySummaryRepository;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailySummaryService {
    private final UserRepository userRepository;
    private final DailySummaryRepository dailySummaryRepository;

    @Autowired
    public DailySummaryService(UserRepository userRepository, DailySummaryRepository dailySummaryRepository) {
        this.userRepository = userRepository;
        this.dailySummaryRepository = dailySummaryRepository;
    }

    public DailySummary findDailySummaryByUsernameAndDate(String username, LocalDate date) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return dailySummaryRepository.findByUserIdAndSummaryDate(user.getId(), date)
                .orElseThrow(() -> new IllegalArgumentException("Summary not found for given date"));
    }

    public List<DailySummary> findDailySummariesByUsernameBetweenDates(String username, LocalDate startDate, LocalDate endDate) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return dailySummaryRepository.findByUserIdAndSummaryDateBetween(user.getId(), startDate, endDate);
    }
}