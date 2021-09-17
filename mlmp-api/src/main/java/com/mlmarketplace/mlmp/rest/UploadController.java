package com.mlmarketplace.mlmp.rest;

import java.io.IOException;

import com.mlmarketplace.mlmp.repository.UploadedContentRepository;
import com.mlmarketplace.mlmp.service.AwsS3Service;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/file")
@RequiredArgsConstructor
public class UploadController {

    private final AwsS3Service awsS3Service;
    private final UploadedContentRepository contentRepository;

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file") final MultipartFile multipartFile) {
        final var objectName = awsS3Service.generateObjectName();

        awsS3Service.uploadFile(multipartFile, objectName);

        return new ResponseEntity<>(objectName, HttpStatus.OK);
    }

    @GetMapping(value = "/download/{objectKey}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable("objectKey") final String objectKey) {
        final var object = awsS3Service.downloadFile(objectKey);
        final var stream = new InputStreamResource(object.getObjectContent().getDelegateStream());
        final var contentLength = object.getObjectMetadata().getContentLength();

        final var fileRecord = contentRepository.getUploadedContentByObjectKey(objectKey).orElseThrow();
        final var mediaType = MediaType.parseMediaType(fileRecord.getMediaType());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + fileRecord.getFilename())
                .contentType(mediaType)
                .contentLength(contentLength)
                .body(stream);
    }

}
