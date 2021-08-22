package com.mlmarketplace.mlmp.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mlmarketplace.mlmp.models.ModelType;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StripePaymentDTO {
    @JsonProperty("userName")
    private String userName;

    @JsonProperty("type")
    private ModelType type;

    @JsonProperty("price")
    private double price;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("productId")
    private long productId;

    @JsonProperty("userId")
    private long userId;
}
