package com.someshop.intershop.controller;

import com.someshop.intershop.model.User;
import com.someshop.intershop.service.BankCardService;
import com.someshop.intershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Controller
public class ProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private BankCardService bankCardService;

    @GetMapping("/profiles/my")
    public String profileMy (Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("profileUser", user);
        return "profile/profile";
    }

    @PostMapping("/profiles/{profileUser}/role")
    public String userSave(@PathVariable User profileUser, @RequestParam(name = "role") String role,
                           Model model) {
        userService.setRole(profileUser, role);
        model.addAttribute("profileUser", profileUser);
        return "redirect:/profiles/" + profileUser.getId();
    }

    @GetMapping("/profiles/my/options")
    public String options (@AuthenticationPrincipal User profileUser, Model model) {
        model.addAttribute("profileUser", profileUser);
        model.addAttribute("activeCard", bankCardService.findActiveByUserId(profileUser.getId().toString()));
        model.addAttribute("nonActiveCards", bankCardService.findNonActiveByUserId(profileUser.getId().toString()));
        return "profile/options";
    }

    @PostMapping("/profiles/my/options")
    public String optionsSave (@AuthenticationPrincipal User profileUser, Model model,
                               @RequestParam Map<String, String> form, @RequestParam("photo_url") MultipartFile file) {
        User newUser = userService.changeInfo(profileUser, form, file);
        if (newUser != null) {
            model.addAttribute("message", "Success");
            model.addAttribute("profileUser", newUser);
            return "profile/options";
        } else {
            model.addAttribute("message","User with that email already exists");
            model.addAttribute("profileUser", profileUser);
        return "profile/options";
        }
    }

    @PostMapping("/profiles/my/password")
    @ResponseBody
    public String passwordSave (@RequestParam Map<String, String> form, @AuthenticationPrincipal User profileUser) {
        if (!userService.changePassword(profileUser, form)) {
            return "Current password is incorrect";
        } else return "Success";
    }
}
