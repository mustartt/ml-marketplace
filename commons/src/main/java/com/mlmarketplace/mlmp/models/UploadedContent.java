package com.mlmarketplace.mlmp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "uploaded_content")
public class UploadedContent {

    @Id
    @Column(name = "object_key")
    private String objectKey;

    @Column(name = "filename")
    private String filename;

    @Column(name = "media_type")
    private String mediaType;

    @Column(name = "status")
    private String status;

    // TODO: add publisher

}
