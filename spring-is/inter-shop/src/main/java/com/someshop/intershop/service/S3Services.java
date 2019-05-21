package com.someshop.intershop.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Services {
    void downloadFile(String keyName);
    void uploadFile(String keyName, MultipartFile file) throws IOException;
    void deleteFile(String keyName);
}
