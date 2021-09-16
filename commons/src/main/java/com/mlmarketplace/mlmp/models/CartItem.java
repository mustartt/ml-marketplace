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

    @Column(name = "model_id", unique = true)
    private Long model_id;

    @Column(name = "dataset_id", unique = true)
    private Long dataset_id;

    @Column(name = "quantity", nullable = false, unique = true)
    private Integer quantity;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long user_id;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "dataset_id")
    private Dataset dateset;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User customer;


}
