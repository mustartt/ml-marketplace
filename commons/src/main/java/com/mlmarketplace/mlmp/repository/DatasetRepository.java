package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatasetRepository extends PagingAndSortingRepository<Dataset, Long> {
}
