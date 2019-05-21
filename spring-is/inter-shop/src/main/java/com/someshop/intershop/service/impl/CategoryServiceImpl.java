package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.CategoryDto;
import com.someshop.intershop.model.Category;
import com.someshop.intershop.repository.CategoryRepository;
import com.someshop.intershop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category findByIdAndNameOrCreate (String id, String name) {
        if (categoryRepository.findById(id) == null) {
            if (categoryRepository.findByCategoryName(name) == null) {
                Category category = new Category(new Long(id), name);
                categoryRepository.save(category);
                return category;
            } else return categoryRepository.findByCategoryName(name);
        } else return categoryRepository.findById(id.toString());
    }

    public Category findByCategoryName (String name) {
        return  categoryRepository.findByCategoryName(name);
    }

    public ResponseEntity<?> findAll () {
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for (Category category : categoryRepository.findAll()) {
            categoryDtos.add(new CategoryDto(category.getId(), category.getCategoryName()));
        }
        return new ResponseEntity<>(categoryDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findAllOrByKeyword(String keyword) {
        if (!keyword.equals("")) return findAllByKeyword(keyword);
        else return findAll();
    }

    public ResponseEntity<?> findAllByKeyword(String keyword) {
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for (Category category : categoryRepository.findAllByKeyword("%" + keyword + "%")) {
            categoryDtos.add(new CategoryDto(category.getId(), category.getCategoryName()));
        }
        return new ResponseEntity<>(categoryDtos, HttpStatus.OK);
    }

    public Category findById (String id) {
        return categoryRepository.findById(id);
    }
}
