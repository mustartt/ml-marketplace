package com.mlmarketplace.mlmp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("model")
    private Model model;

    @JsonProperty("dataset")
    private Dataset dataset;

    @JsonProperty("user")
    private User user;

    @JsonProperty("cost")
    private Double cost;
}
