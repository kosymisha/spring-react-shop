package com.someshop.intershop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "category")
public class Category {
    @Id
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @JsonIgnoreProperties(value = "comments")
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Advert> adverts;

    public Category() {
    }

    public Category(Long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    public Set<Advert> getAdverts() {
        return adverts;
    }

    public void setAdverts(Set<Advert> adverts) {
        this.adverts = adverts;
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
//  https://pages.ebay.com/sellerinformation/growing/categorychanges/clothing-all.html