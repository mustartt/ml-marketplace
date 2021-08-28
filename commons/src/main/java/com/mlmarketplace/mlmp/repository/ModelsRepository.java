package com.mlmarketplace.mlmp.repository;

import java.util.Optional;

import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelsRepository extends PagingAndSortingRepository<Model, Long> {

    Optional<Model> getModelById(final Long id);
    Optional<Model> getModelByPublisherAndName(final User user, final String name);

}
