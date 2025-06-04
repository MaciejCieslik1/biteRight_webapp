package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.update_requests.UserInfoUpdateRequest;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import com.bd2_team6.biteright.entities.user_info.UserInfoRepository;
import com.bd2_team6.biteright.entities.weight_history.WeightHistory;
import com.bd2_team6.biteright.entities.weight_history.WeightHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserInfoService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final WeightHistoryRepository weightHistoryRepository;

    @Autowired
    public UserInfoService(UserRepository userRepository, UserInfoRepository userInfoRepository, WeightHistoryRepository weightHistoryRepository) {
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
        this.weightHistoryRepository = weightHistoryRepository;
    }

    public UserInfo findUserInfoByUsername(String username) {

        User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return user.getUserInfo();
    }

    public UserInfo updateUserInfo(String username, UserInfoUpdateRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Float oldWeight = user.getUserInfo().getWeight();
        UserInfo userInfo = user.getUserInfo();
        userInfo.setName(request.getName());
        userInfo.setSurname(request.getSurname());
        userInfo.setAge(request.getAge());
        userInfo.setWeight(request.getWeight());
        userInfo.setHeight(request.getHeight());
        userInfo.setLifestyle(request.getLifestyle());
        userInfo.setBmi(request.getBmi());

        userInfoRepository.save(userInfo);

        if (!oldWeight.equals(request.getWeight())) {
            WeightHistory weightHistory = new WeightHistory(user, LocalDateTime.now(), oldWeight);
            weightHistoryRepository.save(weightHistory);
        }

        return userInfo;
    }
}
