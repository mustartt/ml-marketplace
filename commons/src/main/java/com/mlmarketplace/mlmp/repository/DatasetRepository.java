package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatasetRepository extends PagingAndSortingRepository<Dataset, Long> {
    Optional<Dataset> getDatasetById(final Long id);

    Optional<Dataset> getDatasetByPublisherAndName(final User user, final String name);
}
