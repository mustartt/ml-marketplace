package com.mlmarketplace.mlmp.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mlmarketplace.mlmp.models.ModelType;
import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;


@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StripePaymentDTO {
    @SerializedName("items")
    Model[] items;
    Dataset[]

    //TODO: Return the total cost of all items in cart
    public double totalPrice() {
        return 15;
    }
}
