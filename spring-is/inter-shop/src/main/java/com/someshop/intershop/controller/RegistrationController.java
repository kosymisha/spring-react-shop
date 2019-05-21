package com.someshop.intershop.controller;

import com.someshop.intershop.model.User;
import com.someshop.intershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;


@Controller
public class RegistrationController {

    @Autowired
    private UserService userService;

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("message", "Add new user.");
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser (Model model, @RequestParam Map<String, String> form,
                           @RequestParam(name = "photo_url") MultipartFile file) throws IOException {
        model.addAttribute("message", userService.create(form, file));
        return "redirect:/login";
    }
}
