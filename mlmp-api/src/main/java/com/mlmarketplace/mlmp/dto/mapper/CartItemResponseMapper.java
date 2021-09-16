package com.mlmarketplace.mlmp.dto.mapper;

import com.mlmarketplace.mlmp.dto.CartItemResponse;
import com.mlmarketplace.mlmp.models.CartItem;

public class CartItemResponseMapper {
    public static CartItemResponse map(final CartItem cartItem) {
        if (cartItem.getDataset() != null) {
            return CartItemResponse.builder()
                    .quantity(cartItem.getQuantity())
                    .userId(cartItem.getUserId())
                    .user(cartItem.getUser())
                    .datasetId(cartItem.getDatasetId())
                    .dataset(cartItem.getDataset())
                    .build();
        } else {
            return CartItemResponse.builder()
                    .quantity(cartItem.getQuantity())
                    .userId(cartItem.getUserId())
                    .user(cartItem.getUser())
                    .modelId(cartItem.getModelId())
                    .model(cartItem.getModel())
                    .build();
        }
    }
}
