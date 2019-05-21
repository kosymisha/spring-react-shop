package com.someshop.intershop.dto;

import java.util.Date;

public class CommentDto {

    private Long id;
    private Date date;
    private UserDto author;
    private String message;

    public CommentDto(Long id, Date date, UserDto author, String message) {
        this.id = id;
        this.date = date;
        this.author = author;
        this.message = message;
    }

    public CommentDto() {
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

    public UserDto getAuthor() {
        return author;
    }

    public void setAuthor(UserDto author) {
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
