package com.someshop.intershop.service.impl;

import com.someshop.intershop.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Value("${upload.path}")
    private String uploadLocalPath;

    @Value("${intershop-is2.s3.bucket}")
    private String bucketName;

    @Value("${noImageUrl}")
    private String noImageUrl;

    @Autowired
    private S3ServicesImpl s3Services;

    public String uploadLocal (MultipartFile file) throws IOException {
        if(file != null){
            File uploadDir = new File(uploadLocalPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName = uuidFile + "." + file.getOriginalFilename();
            file.transferTo(new File(uploadLocalPath + "/" + resultFileName));
            return "/img/" + resultFileName;
        }
        return null;
    }

    public String uploadToS3 (MultipartFile file) throws IOException {
        if (file != null) {
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName = uuidFile + file
                    .getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            s3Services.uploadFile(resultFileName, file);
            return "https://s3.amazonaws.com/" + bucketName  + "/" + resultFileName;
        }
        return  null;
    }

    @Override
    public void deleteFromS3(String photoURL) {
        if (!photoURL.equals(noImageUrl)) {
            s3Services.deleteFile(photoURL
                    .replace("https://s3.amazonaws.com/" + bucketName + "/", ""));
        }
    }
}
