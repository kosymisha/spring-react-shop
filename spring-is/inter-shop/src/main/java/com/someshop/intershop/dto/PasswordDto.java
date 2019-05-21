package com.someshop.intershop.dto;

public class PasswordDto {

    private Long userId;
    private String currentPassword;
    private String confirmPassword;
    private String newPassword;

    public PasswordDto(Long userId, String currentPassword, String confirmPassword, String newPassword) {
        this.userId = userId;
        this.currentPassword = currentPassword;
        this.confirmPassword = confirmPassword;
        this.newPassword = newPassword;
    }

    public PasswordDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
