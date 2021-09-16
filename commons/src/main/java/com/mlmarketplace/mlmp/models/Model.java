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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "model")
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "model_id", nullable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "category")
    @Builder.Default
    private String category = "Other";

    @Column(name = "framework")
    @Builder.Default
    private String framework = "Other";

    @Column(name = "format")
    @Builder.Default
    private String format = "Other";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id", nullable = false)
    private User publisher;

    @Column(name = "type", nullable = false)
    private final ModelType type = ModelType.MODEL;

    // TODO (HJ): user table joins later when done implementing auth

    @Column(name = "excerpt")
    @Builder.Default
    private String excerpt = "";

    @Column(name = "description")
    @Builder.Default
    private String description = "";

    @Column(name = "storage_url")
    @Builder.Default
    private String storageUrl = "";

    @Column(name = "tags")
    @Builder.Default
    private String tags = "";

    @Column(name = "price")
    @Builder.Default
    private double price = 0.0;

    @CreationTimestamp
    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "update_date", nullable = false)
    private Date updateDate;

    //@ManyToMany(mappedBy = "models")
    //private Set<ShoppingCart> carts;
}


