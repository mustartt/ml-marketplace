package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    CartItem findByUserIdAndModelId(Long customerId, Long productId);
    CartItem findByUserIdAndDatasetId(Long customerId, Long productId);

    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.modelId = :productId AND c.userId = :userId")
    void deleteByUserIdAndModelId(@Param("userId") Long customerId, @Param("productId") Long productId);

    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.datasetId = :productId AND c.userId = :userId")
    void deleteByUserIdAndDatasetId(@Param("userId") Long customerId, @Param("productId") Long productId);

    @Modifying
    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.modelId = :productId AND c.userId = :userId")
    void updateQuantityModel(@Param("quantity")Integer quantity, @Param("userId") Long customerId, @Param("productId") Long productId);

    @Modifying
    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.datasetId = :productId AND c.userId = :userId")
    void updateQuantityDataset(@Param("quantity")Integer quantity, @Param("userId") Long customerId, @Param("productId") Long productId);
}
