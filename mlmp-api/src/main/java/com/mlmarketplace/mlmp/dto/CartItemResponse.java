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

    @JsonProperty("model_id")
    private Long modelId;

    @JsonProperty("dataset_id")
    private Long datasetId;

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("model")
    private Model model;

    @JsonProperty("dataset")
    private Dataset dataset;

    @JsonProperty("user")
    private User user;
}
