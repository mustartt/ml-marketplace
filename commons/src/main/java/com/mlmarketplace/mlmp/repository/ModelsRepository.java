package com.mlmarketplace.mlmp.repository;

import java.awt.print.Pageable;

import com.mlmarketplace.mlmp.models.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelsRepository extends JpaRepository<Model, Long> {

    Page<Model> getAllModels(final Pageable page);

}
