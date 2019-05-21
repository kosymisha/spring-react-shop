package com.someshop.intershop.controller;

import com.someshop.intershop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return categoryService.findAllOrByKeyword(keyword);
    }
}
