package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelsRepository extends JpaRepository<Model, Long> {

    Page<Model> getAllModels(final Pageable page);

}
