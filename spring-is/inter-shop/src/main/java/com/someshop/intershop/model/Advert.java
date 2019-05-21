package com.someshop.intershop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "advert")
public class Advert implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "store_id")
    private String storeId;

    @Column
    @NotBlank(message = "This field cannot be blank")
    private String currency;

    @Column(name = "int_part_price")
    private Integer intPartPrice;

    @Column(name = "fract_part_price")
    private Integer fractPartPrice;

    @Column
    private Integer views;

    @Column
    private String description;

    @Column(name = "product_url")
    private String productURL;

    @Column(name = "available")
    private Boolean available;

    @Column(name = "photo_url")
    private String photoURL;

    @Column
    @NotBlank(message = "This field cannot be blank")
    private String title;

    //@NotBlank(message = "This field cannot be blank")
    @JsonIgnoreProperties(value = "adverts")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    //@NotBlank(message = "This field cannot be blank")
    @JsonIgnoreProperties(value = "adverts")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @JsonIgnoreProperties(value = "adverts")
    @OneToMany(mappedBy = "advert", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @JsonIgnoreProperties(value = "adverts")
    @OneToMany(mappedBy = "advert", cascade = CascadeType.ALL)
    private Set<Order> orders;

    public Advert() {

    }

    public Advert(String storeId, String currency, Integer views, String description, String productURL, String title,
                  Category category, String photoURL, Boolean available, Shop shop, Integer intPartPrice, Integer fractPartPrice) {
        this.storeId = storeId;
        this.currency = currency;
        this.intPartPrice = intPartPrice;
        this.fractPartPrice = fractPartPrice;
        this.views = views;
        this.description = description;
        this.productURL = productURL;
        this.available = available;
        this.photoURL = photoURL;
        this.title = title;
        this.category = category;
        this.shop = shop;
    }

    public Integer getCommentsSize () {
        return this.comments.size();
    }

    public BigDecimal getPrice () {
        return new BigDecimal(this.intPartPrice.toString() + "." + this.fractPartPrice.toString());
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

    public void setFractPartPrice(Integer fracPartPrice) {
        this.fractPartPrice = fracPartPrice;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void addView () { this.views++; }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public String getProductURL() {
        return productURL;
    }

    public void setProductURL(String productURL) {
        this.productURL = productURL;
    }
}
