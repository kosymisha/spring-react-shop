package com.someshop.intershop.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.someshop.intershop.service.S3Services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class S3ServicesImpl implements S3Services {

    @Autowired
    private AmazonS3 s3client;

    @Value("${intershop-is2.s3.bucket}")
    private String bucketName;

    @Override
    public void downloadFile(String keyName) {
        S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, keyName));
    }

    @Override
    public void uploadFile(String keyName, MultipartFile file) throws IOException {
        s3client.putObject(new PutObjectRequest(bucketName, keyName, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    @Override
    public void deleteFile(String keyName) {
        s3client.deleteObject(new DeleteObjectRequest(bucketName, keyName));
    }
}

