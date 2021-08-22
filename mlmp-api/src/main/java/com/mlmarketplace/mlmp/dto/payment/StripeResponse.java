package com.mlmarketplace.mlmp.dto.payment;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StripeResponse {
    private String sessionId;
}
