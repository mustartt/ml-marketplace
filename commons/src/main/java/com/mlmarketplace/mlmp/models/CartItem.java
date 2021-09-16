package com.mlmarketplace.mlmp.models;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "dataset_id")
    private Long datasetId;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "model_id", insertable = false, updatable = false)
    private Model model;

    @ManyToOne
    @JoinColumn(name = "dataset_id", insertable = false, updatable = false)
    private Dataset dateset;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;


}
