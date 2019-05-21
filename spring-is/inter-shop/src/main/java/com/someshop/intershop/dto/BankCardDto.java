package com.someshop.intershop.dto;

public class BankCardDto {
    private Long id;
    private String numberCard;
    private String firstNameCard;
    private String lastNameCard;
    private String month;
    private String year;
    private Boolean active;
    private UserDto owner;

    public BankCardDto(Long id, String numberCard, String firstNameCard, String lastNameCard, String month,
                       String year, Boolean active, UserDto owner) {
        this.id = id;
        this.numberCard = numberCard;
        this.firstNameCard = firstNameCard;
        this.lastNameCard = lastNameCard;
        this.month = month;
        this.year = year;
        this.active = active;
        this.owner = owner;
    }
    public BankCardDto(Long id, String numberCard, String firstNameCard, String lastNameCard) {
        this.id = id;
        this.numberCard = numberCard;
        this.firstNameCard = firstNameCard;
        this.lastNameCard = lastNameCard;
    }

    public BankCardDto() {
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public UserDto getOwner() {
        return owner;
    }

    public void setOwner(UserDto owner) {
        this.owner = owner;
    }
}
