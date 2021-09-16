package com.mlmarketplace.mlmp.models;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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
@Table(name = "dataset")
public class Dataset {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "dataset_id", nullable = false, unique = true)
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
    private ModelType type = ModelType.DATASET;

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
    @Column(name = "update_date", nullable = false)
    private Date updateDate;

    @ManyToMany(mappedBy = "datasets")
    private Set<ShoppingCart> carts;
}



