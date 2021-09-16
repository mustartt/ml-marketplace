package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.dto.CartItemResponse;
import com.mlmarketplace.mlmp.dto.mapper.CartItemResponseMapper;
import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingCartService {
    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> listCartItems(User customer) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(customer.getId());
        return  cartItems;
    }
}
