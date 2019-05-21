package com.someshop.intershop.dto;

import com.someshop.intershop.model.Shop;

import java.math.BigDecimal;

public class AdvertDto {

    private Long id;
    private String currency;
    private Integer intPartPrice;
    private Integer fractPartPrice;
    private Integer views;
    private String description;
    private String productURL;
    private Boolean available;
    private String photoURL;
    private String title;
    private String categoryName;
    private CategoryDto category;
    private ShopDto shop;

    public AdvertDto() {
    }

    public AdvertDto(Long id, String currency, Integer views, String description, String productURL, String title,
                     String photoURL, String categoryName, ShopDto shop, Integer intPartPrice, Integer fractPartPrice,
                     Boolean available) {
        this.id = id;
        this.currency = currency;
        this.intPartPrice = intPartPrice;
        this.fractPartPrice = fractPartPrice;
        this.views = views;
        this.description = description;
        this.productURL = productURL;
        this.title = title;
        this.photoURL = photoURL;
        this.categoryName = categoryName;
        this.shop = shop;
        this.available = available;
    }

    public AdvertDto(Long id, String currency, Integer views, String description, String productURL, String title,
                     String photoURL, String categoryName, Integer intPartPrice, Integer fractPartPrice,
                     Boolean available) {
        this.id = id;
        this.currency = currency;
        this.intPartPrice = intPartPrice;
        this.fractPartPrice = fractPartPrice;
        this.views = views;
        this.description = description;
        this.productURL = productURL;
        this.title = title;
        this.photoURL = photoURL;
        this.categoryName = categoryName;
        this.available = available;
    }

    public AdvertDto(Long id, String currency, String title, String photoURL, Integer intPartPrice,
                     Integer fractPartPrice) {
        this.id = id;
        this.currency = currency;
        this.intPartPrice = intPartPrice;
        this.fractPartPrice = fractPartPrice;
        this.title = title;
        this.photoURL = photoURL;
    }

    public AdvertDto(Long id, String currency, String title, String photoURL, Integer intPartPrice,
                     Integer fractPartPrice, ShopDto shop) {
        this.id = id;
        this.currency = currency;
        this.intPartPrice = intPartPrice;
        this.fractPartPrice = fractPartPrice;
        this.title = title;
        this.photoURL = photoURL;
        this.shop = shop;
    }

    public AdvertDto(Long id) {
        this.id = id;
    }

    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getProductURL() {
        return productURL;
    }

    public void setProductURL(String productURL) {
        this.productURL = productURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getIntPartPrice() {
        return intPartPrice;
    }

    public void setIntPartPrice(Integer intPartPrice) {
        this.intPartPrice = intPartPrice;
    }

    public Integer getFractPartPrice() {
        return fractPartPrice;
    }

    public void setFractPartPrice(Integer fractPartPrice) {
        this.fractPartPrice = fractPartPrice;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public ShopDto getShop() {
        return shop;
    }

    public void setShop(ShopDto shop) {
        this.shop = shop;
    }
}
