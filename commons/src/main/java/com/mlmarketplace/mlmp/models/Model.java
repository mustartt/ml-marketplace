package com.mlmarketplace.mlmp.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@RequiredArgsConstructor
public class Model {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String category;
    private String framework;
    private String format;
    private String type;
    private int publisher;
    private String description;
    private String descriptionFull;
    private String storageUrl;
    private String tags;
    private double price;

    private Date createDate;
    private Date updateDate;
}


