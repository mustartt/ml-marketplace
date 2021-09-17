package com.mlmarketplace.mlmp.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.mlmarketplace.mlmp.models.UploadedContent;
import com.mlmarketplace.mlmp.repository.UploadedContentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AmazonS3 amazonS3;
    private final UploadedContentRepository contentRepository;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Async
    public void uploadFile(final MultipartFile multipartFile, final String objectKeyName) {
        final var mediaType = multipartFile.getContentType();
        final var uploadedContent = UploadedContent.builder()
                .objectKey(objectKeyName)
                .filename(multipartFile.getOriginalFilename())
                .mediaType(mediaType)
                .status("pending")
                .build();
        contentRepository.save(uploadedContent);

        try {
            final File file = convertMultiPartFileToFile(multipartFile, objectKeyName);
            uploadFileToS3Bucket(bucketName, file, objectKeyName);
            final var result = file.delete();
            if (!result) log.info("Failed to delete uploaded file.");

            uploadedContent.setStatus("complete");
            contentRepository.save(uploadedContent);
        } catch (final AmazonServiceException ex) {
            log.info("File upload failed.");
            log.error("Error = {} while uploading file.", ex.getMessage());
            uploadedContent.setStatus("failed");
        }
    }

    private File convertMultiPartFileToFile(final MultipartFile multipartFile, final String filename) {
        final File file = new File(filename);
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            log.error("Error converting the multi-part file to file = " + ex.getMessage());
        }
        return file;
    }

    private void uploadFileToS3Bucket(final String bucketName, final File file, final String filename) {
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, filename, file);
        amazonS3.putObject(putObjectRequest);
    }

    public S3Object downloadFile(final String objectKeyName) {
        return amazonS3.getObject(bucketName, objectKeyName);
    }

    public String generateObjectName() {
        final var str = "FILE_" + System.currentTimeMillis();
        final var encoded = Base64.getEncoder().encode(str.getBytes());
        return "FILE_" + new String(encoded);
    }

}
