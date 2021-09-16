package com.mlmarketplace.mlmp.models;


import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "cart")
@RequiredArgsConstructor
public class ShoppingCart {
    /*@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long user_id;

    @ManyToMany
    @JoinTable(
            name = "cart_models",
            joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "model_id"))
    private Set<Model> models;

    @ManyToMany
    @JoinTable(
            name = "cart_datasets",
            joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "dataset_id"))
    private Set<Dataset> datasets;*/
}
