package com.someshop.intershop.dto;

import java.util.Date;

public class OrderDto {

    private Long id;
    private Date date;
    private boolean paid;
    private UserDto user;
    private AdvertDto advert;

    public OrderDto() {
    }

    public OrderDto(Long id, Date date, boolean paid, UserDto user, AdvertDto advert) {
        this.id = id;
        this.date = date;
        this.paid = paid;
        this.user = user;
        this.advert = advert;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public AdvertDto getAdvert() {
        return advert;
    }

    public void setAdvert(AdvertDto advert) {
        this.advert = advert;
    }
}
