package com.someshop.intershop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity
@Table(name = "shop")
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "This field cannot be blank")
    @Column(name = "name_shop")
    private String nameShop;

    @NotBlank(message = "This field cannot be blank")
    @Column
    private String url;

    @Column(name = "photo_url")
    private String photoURL;

    @Column(name = "description")
    private String description;

    @JsonIgnoreProperties(value = "shops")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User owner;

    @JsonIgnoreProperties(value = "shop")
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    private Set<Advert> adverts;

    @JsonIgnoreProperties(value = {"shop"})
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    public Shop(String nameShop, String url, User owner, String photoURL, String description) {
        this.nameShop = nameShop;
        this.url = url;
        this.owner = owner;
        this.photoURL = photoURL;
        this.description = description;
    }

    public Shop() {
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Advert> getAdverts() {
        return adverts;
    }

    public void setAdverts(Set<Advert> adverts) {
        this.adverts = adverts;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

}
