package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.update_requests.UserPreferencesUpdateRequest;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user_preferences.UserPreferences;
import org.springframework.stereotype.Service;

@Service
public class UserPreferencesService {

    private final UserRepository userRepository;

    public UserPreferences findUserPreferencesByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getUserPreferences();
    }

    public UserPreferences updateUserPreferences(String username, UserPreferencesUpdateRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        UserPreferences userPreferences = user.getUserPreferences();

        userPreferences.setLanguage(request.getLanguage());
        userPreferences.setDarkmode(request.getDarkMode());
        userPreferences.setFont(request.getFont());
        userPreferences.setNotifications(request.getNotifications());

        return userPreferences;
    }

    public UserPreferencesService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
