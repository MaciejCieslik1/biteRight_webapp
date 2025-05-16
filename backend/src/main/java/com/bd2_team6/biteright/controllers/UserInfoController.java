package com.bd2_team6.biteright.controllers;

import com.bd2_team6.biteright.controllers.requests.update_requests.UserInfoUpdateRequest;
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

    @GetMapping("/findUserInfo")
    public ResponseEntity<?> findUserInfo(Authentication authentication) {
        String username = authentication.getName();

        try {
            UserInfo userInfo = userInfoService.findUserInfoByUsername(username);
            return ResponseEntity.ok(userInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/updateUserInfo")
    public ResponseEntity<?> updateUserInfo(Authentication authentication, @RequestBody UserInfoUpdateRequest request) {
        String username = authentication.getName();

        try {
            UserInfo userInfo = userInfoService.updateUserInfo(username, request);
            return ResponseEntity.ok(userInfo);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
