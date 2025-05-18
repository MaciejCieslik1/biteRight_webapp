package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.DTO.UserInfoDTO;
import com.bd2_team6.biteright.controllers.requests.update_requests.UserInfoUpdateRequest;
import com.bd2_team6.biteright.entities.user.UserRepository;
import com.bd2_team6.biteright.entities.user_info.UserInfo;
import com.bd2_team6.biteright.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/userInfo")
@RequiredArgsConstructor
public class UserInfoController {

    private final UserInfoService userInfoService;
    private final UserRepository userRepository;

    @GetMapping("/findUserInfo")
    public ResponseEntity<?> findUserInfo(Authentication authentication) {
        try {
            String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);
            UserInfo userInfo = userInfoService.findUserInfoByUsername(username);
            UserInfoDTO userInfoDTO = new UserInfoDTO(userInfo.getUserInfoId(), userInfo.getName(), userInfo.getSurname(),
                    userInfo.getAge(), userInfo.getWeight(), userInfo.getHeight(), userInfo.getLifestyle(), userInfo.getBmi());
            return ResponseEntity.ok(userInfoDTO);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserInfo(Authentication authentication, @RequestBody UserInfoUpdateRequest request) {
        try {
            String username = ControllerHelperClass.getUsernameFromAuthentication(authentication, userRepository);
            UserInfo userInfo = userInfoService.updateUserInfo(username, request);
            return ResponseEntity.ok(userInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
