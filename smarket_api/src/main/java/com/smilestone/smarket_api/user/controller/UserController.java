package com.smilestone.smarket_api.user.controller;

import com.smilestone.smarket_api.user.controller.dto.*;
import com.smilestone.smarket_api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest request) {
        return new ResponseEntity<>(userService.createUser(request), HttpStatus.CREATED);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest request) {
        return new ResponseEntity<>(userService.signIn(request), HttpStatus.OK);
    }

    @GetMapping("/users/signin")
    public ResponseEntity<SignInResponse> signInWithJWT(@RequestParam String userId) {
        return new ResponseEntity<>(userService.validWithJWT(userId), HttpStatus.OK);
    }

    @GetMapping("/users/token")
    public ResponseEntity<String> updateJWT(@RequestParam UUID tokenId) {
        return new ResponseEntity<>(userService.updateToken(tokenId), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<UserInfoResponse> updateJWT(@RequestParam Long id) {
        return new ResponseEntity<>(userService.allInfoBy(id), HttpStatus.OK);
    }


}
