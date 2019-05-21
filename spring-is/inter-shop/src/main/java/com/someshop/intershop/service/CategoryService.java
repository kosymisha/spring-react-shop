package com.someshop.intershop.service;

import com.someshop.intershop.model.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    Category findByIdAndNameOrCreate (String id, String name);
    Category findByCategoryName (String name);
    ResponseEntity<?> findAll ();
    ResponseEntity<?> findAllOrByKeyword (String keyword);
    Category findById (String id);
}
