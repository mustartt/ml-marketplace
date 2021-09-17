package com.mlmarketplace.mlmp.repository;

import java.util.Optional;

import com.mlmarketplace.mlmp.models.UploadedContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadedContentRepository extends JpaRepository<UploadedContent, String> {

    Optional<UploadedContent> getUploadedContentByObjectKey(final String objectKey);

}
