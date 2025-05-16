package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.update_requests.UserInfoUpdateRequest;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    private final UserRepository userRepository;

    @Autowired
    public UserInfoService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserInfo findUserInfoByUsername(String username) {

        User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return user.getUserInfo();
    }

    public UserInfo updateUserInfo(String username, UserInfoUpdateRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserInfo userInfo = user.getUserInfo();
        userInfo.setName(request.getName());
        userInfo.setSurname(request.getName());
        userInfo.setAge(request.getAge());
        userInfo.setWeight(request.getWeight());
        userInfo.setHeight(request.getHeight());
        userInfo.setLifestyle(request.getLifestyle());
        userInfo.setBmi(request.getBmi());

        return userInfo;
    }
}
