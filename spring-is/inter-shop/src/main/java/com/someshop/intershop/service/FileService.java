package com.someshop.intershop.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String uploadLocal (MultipartFile file) throws IOException;
    String uploadToS3 (MultipartFile file) throws IOException;
    void deleteFromS3 (String photoURL);
}
