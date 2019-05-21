package com.someshop.intershop.dto;

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String photoURL;
    private String email;
    private String role;
    private Boolean active;
    private String provider;

    public UserDto() {
    }

    public UserDto(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public UserDto(Long id, String firstName, String lastName, String photoURL, String email, String role,
                   Boolean active, String provider) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoURL = photoURL;
        this.email = email;
        this.role = role;
        this.active = active;
        this.provider = provider;
    }

    public UserDto(Long id, String firstName, String lastName, String photoURL) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoURL = photoURL;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }
}
