package com.someshop.intershop.dto;


public class ShopDto {
    private Long id;
    private String nameShop;
    private String url;
    private String photoURL;
    private String description;
    private UserDto owner;


    public ShopDto(Long id, String nameShop, String photoURL, String description, String url, UserDto owner) {
        this.id = id;
        this.nameShop = nameShop;
        this.photoURL = photoURL;
        this.owner = owner;
        this.description = description;
        this.url = url;
    }

    public ShopDto(Long id, String nameShop, String photoURL, String description, String url) {
        this.id = id;
        this.nameShop = nameShop;
        this.photoURL = photoURL;
        this.description = description;
        this.url = url;
    }

    public ShopDto(Long id, String nameShop, String url) {
        this.id = id;
        this.nameShop = nameShop;
        this.url = url;
    }

    public ShopDto(Long id, String nameShop, String url, UserDto owner) {
        this.id = id;
        this.nameShop = nameShop;
        this.url = url;
        this.owner = owner;
    }

    public ShopDto(String nameShop) {
        this.nameShop = nameShop;
    }

    public ShopDto(Long id) {
        this.id = id;
    }

    public ShopDto() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameShop() {
        return nameShop;
    }

    public void setNameShop(String nameShop) {
        this.nameShop = nameShop;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public UserDto getOwner() {
        return owner;
    }

    public void setOwner(UserDto owner) {
        this.owner = owner;
    }
}
