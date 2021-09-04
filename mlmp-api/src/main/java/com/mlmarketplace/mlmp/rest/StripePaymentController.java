package com.mlmarketplace.mlmp.rest;

import com.google.gson.Gson;
import com.mlmarketplace.mlmp.dto.UserResponse;
import com.mlmarketplace.mlmp.dto.payment.StripePaymentDTO;
import com.mlmarketplace.mlmp.dto.payment.StripeResponse;
import com.mlmarketplace.mlmp.service.StripePaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class StripePaymentController {

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @Autowired
    private StripePaymentService stripePaymentService;

    private static Gson gson = new Gson();

    //TODO: Allow different currencies.
    @PostMapping("/payment/create-payment-intent")
    public StripeResponse createPaymentIntent(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                    .setCurrency("usd")
                    .setAmount((long) stripePaymentDTO.totalPrice() * 100L)
                    .build();
            PaymentIntent intent = PaymentIntent.create(createParams);
            StripeResponse stripeResponse = new StripeResponse(intent.getClientSecret());
            return stripeResponse;
    }



}
