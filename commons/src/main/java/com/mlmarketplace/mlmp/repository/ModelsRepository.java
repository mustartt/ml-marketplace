package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.Model;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelsRepository extends PagingAndSortingRepository<Model, Long> {
}
