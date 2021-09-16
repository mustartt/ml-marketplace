package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(String userId);
    //void deleteByUserAndProduct(Long customerId, Long productId);
    //void updateQuantity(int quantity, Long customerId, Long productId);
}
