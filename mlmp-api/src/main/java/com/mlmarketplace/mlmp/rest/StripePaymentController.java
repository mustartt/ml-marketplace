package com.mlmarketplace.mlmp.rest;

import com.mlmarketplace.mlmp.service.StripePaymentService;
import com.stripe.model.Charge;
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
@RequestMapping(path = "/api/payment")
public class StripePaymentController {

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @Autowired
    private StripePaymentService stripePaymentService;

    @PostMapping("/charge")
    public Charge chargeCard(@RequestBody final String stripeToken, @RequestBody final Double amount) throws Exception {
        return stripePaymentService.chargeNewCard(stripeToken, amount);
    }

}
