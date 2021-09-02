package com.mlmarketplace.mlmp.repository;

import java.util.Optional;

import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelsRepository extends PagingAndSortingRepository<Model, Long> {

    Optional<Model> getModelById(final Long id);

    Optional<Model> getModelByPublisherAndName(final User user, final String name);

    @Query("select model from Model model where " +
            "(:category is null or model.category = :category) " +
            "and (:framework is null or model.framework = :framework) " +
            "and (:format is null or model.format = :format) " +
            "and model.price >= :lowerbound " +
            "and model.price <= :upperbound " +
            "and (:search is null or " +
            "model.name like %:search% or " +
            "model.excerpt like %:search% or " +
            "model.description like %:search%)"
    )
    Page<Model> search(@Nullable @Param("search") final String search,
                       @Nullable @Param("category") final String category,
                       @Nullable @Param("framework") final String framework,
                       @Nullable @Param("format") final String format,
                       @Param("lowerbound") final double lowerbound,
                       @Param("upperbound") final double upperbound,
                       final Pageable pageable);

}
