package com.someshop.intershop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "bank_card")
public class BankCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number_card")
    private String numberCard;

    @Column(name = "first_name_card")
    private String firstNameCard;

    @Column(name = "last_name_card")
    private String lastNameCard;

    @Column(name = "month")
    private String month;

    @Column(name = "year")
    private String year;

    @Column(name = "active")
    private Boolean active;

    @JsonIgnoreProperties(value = "cards")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User owner;

    public BankCard(String numberCard, String firstNameCard, String lastNameCard, String month, String year,
                    User owner, Boolean active) {
        this.numberCard = numberCard;
        this.firstNameCard = firstNameCard;
        this.lastNameCard = lastNameCard;
        this.month = month;
        this.year = year;
        this.owner = owner;
        this.active = active;
    }

    public BankCard() {
    }

    public boolean isActive () {
        return active;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumberCard() {
        return numberCard;
    }

    public void setNumberCard(String numberCard) {
        this.numberCard = numberCard;
    }

    public String getFirstNameCard() {
        return firstNameCard;
    }

    public void setFirstNameCard(String firstNameCard) {
        this.firstNameCard = firstNameCard;
    }

    public String getLastNameCard() {
        return lastNameCard;
    }

    public void setLastNameCard(String lastNameCard) {
        this.lastNameCard = lastNameCard;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
