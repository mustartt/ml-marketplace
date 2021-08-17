package com.mlmarketplace.mlmp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "product")
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "model_id", nullable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "framework")
    private String framework;

    @Column(name = "format")
    private String format;

    @Column(name = "type", nullable = false)
    private ModelType type;

    // TODO (HJ): user table joins later when done implementing auth

    @Column(name = "excerpt")
    private String excerpt;

    @Column(name = "description")
    private String description;

    @Column(name = "storage_url")
    private String storageUrl;

    @Column(name = "tags")
    private String tags;

    @Column(name = "price")
    private double price;

    @CreationTimestamp
    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "description", nullable = false)
    private Date updateDate;
}


