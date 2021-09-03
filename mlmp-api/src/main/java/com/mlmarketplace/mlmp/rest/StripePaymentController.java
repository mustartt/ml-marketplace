package com.mlmarketplace.mlmp.rest;

import com.mlmarketplace.mlmp.dto.payment.StripePaymentDTO;
import com.mlmarketplace.mlmp.dto.payment.StripeResponse;
import com.mlmarketplace.mlmp.service.StripePaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;


import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@RestController
@RequestMapping(path = "/payment")
public class StripePaymentController {

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @Autowired
    private StripePaymentService stripePaymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<StripeResponse> createCharge(@RequestBody List<StripePaymentDTO> paymentDTOList) throws StripeException {
        Session session = stripePaymentService.createSession(paymentDTOList);
        StripeResponse stripeResponse = new StripeResponse(session.getId());
        return new ResponseEntity<>(stripeResponse, HttpStatus.OK);
    }
}
