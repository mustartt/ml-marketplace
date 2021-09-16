package com.mlmarketplace.mlmp.dto.mapper;

import com.mlmarketplace.mlmp.dto.CartItemResponse;
import com.mlmarketplace.mlmp.dto.UserResponse;
import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.repository.CartItemRepository;

import java.util.List;
import java.util.stream.Collectors;

public class CartItemResponseMapper {
    public static CartItemResponse map(final CartItem cartItem) {
        if (cartItem.getDataset() != null) {
            return CartItemResponse.builder()
                    .id(cartItem.getId())
                    .quantity(cartItem.getQuantity())
                    .userId(cartItem.getUserId())
                    .user(cartItem.getUser())
                    .datasetId(cartItem.getDatasetId())
                    .dataset(cartItem.getDataset())
                    .build();
        } else {
            return CartItemResponse.builder()
                    .id(cartItem.getId())
                    .quantity(cartItem.getQuantity())
                    .userId(cartItem.getUserId())
                    .user(cartItem.getUser())
                    .modelId(cartItem.getModelId())
                    .model(cartItem.getModel())
                    .build();
        }
    }
}
