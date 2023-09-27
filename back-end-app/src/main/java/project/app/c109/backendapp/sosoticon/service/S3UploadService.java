package project.app.c109.backendapp.sosoticon.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;


import org.springframework.beans.factory.annotation.Value;


import java.nio.file.Path;

@Service
public class S3UploadService {

    private final S3Client s3Client;

    @Value("${BUCKET_NAME}")
    private String bucketName;

    public S3UploadService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadImageToS3(String key, Path file) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.putObject(putObjectRequest, file);

        // URL 생성
        String fileUrl = "https://" + bucketName + ".s3.amazonaws.com/" + key;
        return fileUrl;
    }
}