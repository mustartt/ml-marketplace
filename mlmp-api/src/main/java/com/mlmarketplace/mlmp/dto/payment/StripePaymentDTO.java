package com.mlmarketplace.mlmp.dto.payment;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;


@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StripePaymentDTO {
    //@SerializedName("items")
    //Model[] items;
    //Dataset[]

    //TODO: Return the total cost of all items in cart
    public double totalPrice() {
        return 15;
    }
}
