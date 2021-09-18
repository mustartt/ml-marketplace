package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
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

    List<CartItem> findByUser(User user);

    CartItem findByUserAndModel(User user, Model model);

    CartItem findByUserAndDataset(User user, Dataset dataset);

    void deleteByUserAndModel(User user, Model model);

    void deleteByUserAndDataset(User user, Dataset dataset);

    @Modifying
    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.model.id = :productId AND c.user.id = :userId")
    void updateQuantityModel(@Param("quantity")Integer quantity, @Param("user") Long customerId, @Param("productId") Long productId);

    @Modifying
    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.dataset.id = :productId AND c.user.id = :userId")
    void updateQuantityDataset(@Param("quantity")Integer quantity, @Param("userId") Long customerId, @Param("productId") Long productId);
}
