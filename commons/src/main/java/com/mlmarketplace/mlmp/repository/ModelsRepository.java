package com.mlmarketplace.mlmp.repository;

import java.util.Optional;

import com.mlmarketplace.mlmp.models.Model;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelsRepository extends PagingAndSortingRepository<Model, Long> {

    Optional<Model> getModelById(final Long id);
    Optional<Model> getModelByName(final String name);

}
