package com.someshop.intershop.dto;

public class CategoryDto {

    private Long id;
    private String categoryName;

    public CategoryDto(Long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    public CategoryDto(Long id) {
        this.id = id;
    }

    public CategoryDto(String categoryName) {
        this.categoryName = categoryName;
    }

    public CategoryDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
