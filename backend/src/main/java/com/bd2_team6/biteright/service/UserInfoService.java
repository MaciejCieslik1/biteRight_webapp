package com.bd2_team6.biteright.service;

import com.bd2_team6.biteright.controllers.requests.update_requests.UserInfoUpdateRequest;
import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import com.bd2_team6.biteright.entities.user_info.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public UserInfoService(UserRepository userRepository, UserInfoRepository userInfoRepository) {
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
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
        userInfo.setSurname(request.getSurname());
        userInfo.setAge(request.getAge());
        userInfo.setWeight(request.getWeight());
        userInfo.setHeight(request.getHeight());
        userInfo.setLifestyle(request.getLifestyle());
        userInfo.setBmi(request.getBmi());

        userInfoRepository.save(userInfo);

        return userInfo;
    }
}
