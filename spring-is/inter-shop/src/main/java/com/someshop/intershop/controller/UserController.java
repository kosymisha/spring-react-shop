package com.someshop.intershop.controller;

import com.someshop.intershop.dto.PasswordDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.exception.ResourceNotFoundException;
import com.someshop.intershop.model.User;
import com.someshop.intershop.repository.UserRepository;
import com.someshop.intershop.security.CurrentUser;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal user) {
        return userService.getCurrentUser(user);
    }

    @GetMapping("/profiles")
    public ResponseEntity<?> getProfiles (@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return userService.getProfilesByKeyword(keyword);
    }

    @GetMapping("/profiles/{profile}")
    public ResponseEntity<?> getProfile (@PathVariable User profile) {
        return userService.getProfile(profile);
    }

    @DeleteMapping("/profiles/{profile}")
    public void deleteProfile (@PathVariable User profile) {
        userService.delete(profile);
    }

    @PutMapping("/profiles/{profile}")
    public ResponseEntity<?> updateProfile (@PathVariable User profile, @RequestBody UserDto newProfile) {
        return userService.updateProfile(profile, newProfile);
    }

    @PutMapping("/profiles/{profile}/role")
    public ResponseEntity<?> setRole (@PathVariable User profile, @RequestBody String role) {
         return userService.setRole(profile, role);
    }

    @GetMapping("/profiles/{profile}/active")
    public ResponseEntity<?> setActive (@PathVariable User profile) {
        return userService.setActive(profile);
    }

    @PostMapping(value = "/profiles/{profile}/uploadFile", consumes = "multipart/form-data")
    public void uploadFileProfile(@PathVariable User profile, @RequestParam("file") MultipartFile file) {
        userService.setPhotoProfile(file, profile);
    }

    @DeleteMapping("/profiles/{profile}/uploadFile")
    public void deleteFileProfile (@PathVariable User profile) {
        userService.deletePhotoProfile(profile);
    }

    @PutMapping("/profiles/{profile}/password")
    public ResponseEntity<?> updatePassword (@PathVariable User profile, @RequestBody PasswordDto passwordDto) {
        return userService.updatePassword(profile, passwordDto);
    }
}
