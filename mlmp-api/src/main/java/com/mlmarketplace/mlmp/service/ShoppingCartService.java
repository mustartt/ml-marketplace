package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.repository.CartItemRepository;
import com.mlmarketplace.mlmp.repository.DatasetRepository;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ShoppingCartService {
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ModelsRepository modelsRepository;
    @Autowired
    private DatasetRepository datasetRepository;

    public List<CartItem> listCartItems(User customer) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(customer.getId());
        return  cartItems;
    }

    public Integer addProduct(Long productId, Integer addedQuantity, User customer, String type) {
        Integer quantity = addedQuantity;
        CartItem cartItem = null;
        if (type.equals("Model")) {
            cartItem = cartItemRepository.findByUserIdAndModelId(customer.getId(), productId);
            if (cartItem != null) {
                quantity = cartItem.getQuantity() + addedQuantity;
                cartItem.setQuantity(quantity);
                return quantity;
            } else {
                cartItem = CartItem.builder()
                        .quantity(quantity)
                        .modelId(productId)
                        .userId(customer.getId())
                        .build();
            }
        } else {
            cartItem = cartItemRepository.findByUserIdAndDatasetId(customer.getId(), productId);
            if (cartItem != null) {
                quantity = cartItem.getQuantity() + addedQuantity;
                cartItem.setQuantity(quantity);
                return quantity;
            } else {
                cartItem = CartItem.builder()
                        .quantity(quantity)
                        .datasetId(productId)
                        .userId(customer.getId())
                        .build();
            }
        }
        cartItemRepository.save(cartItem);
        return quantity;
    }

    public boolean removeProduct(Long productId, User customer, String type) {
        boolean exist = false;
        if (type.equals("Model")) {
            if (cartItemRepository.findByUserIdAndModelId(customer.getId(), productId) != null) {
                exist = true;
                cartItemRepository.deleteByUserIdAndModelId(customer.getId(), productId);
            }
        } else {
            if (cartItemRepository.findByUserIdAndDatasetId(customer.getId(), productId) != null) {
                exist = true;
                cartItemRepository.deleteByUserIdAndDatasetId(customer.getId(), productId);
            }
        }
        return exist;
    }

    public double updateQuantityProduct(Long productId, Integer quantity, User customer, String type) {
        CartItem cartItem = null;
        if (type.equals("Model")) {
            cartItemRepository.updateQuantityModel(quantity, customer.getId(), productId);
            cartItem = cartItemRepository.findByUserIdAndModelId(customer.getId(), productId);
        } else {
            cartItemRepository.updateQuantityDataset(quantity, customer.getId(), productId);
            cartItem = cartItemRepository.findByUserIdAndDatasetId(customer.getId(), productId);
        }
        if (cartItem != null) {
            return cartItem.getTotal();
        } else {
            return -1;
        }
    }
}
