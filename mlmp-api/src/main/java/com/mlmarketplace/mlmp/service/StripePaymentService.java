package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.dto.payment.StripePaymentDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Service
@Transactional
public class StripePaymentService {
    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    @Value("${baseURL}")
    private String baseURL;

    public SessionCreateParams.LineItem.PriceData createPriceData(StripePaymentDTO stripePaymentDTO) {
        return SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("usd")
                .setUnitAmount( ((long) stripePaymentDTO.getPrice()) * 100)
                .setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(stripePaymentDTO.getProductName())
                                .build())
                .build();
    }


    public SessionCreateParams.LineItem createSessionLineItem(StripePaymentDTO stripePaymentDTO) {
        return SessionCreateParams.LineItem.builder()
                .setPriceData(createPriceData(stripePaymentDTO))
                .setQuantity(Long.parseLong(String.valueOf(stripePaymentDTO.getQuantity())))
                .build();
    }


    public Session createSession(List<StripePaymentDTO> stripePaymentDTOList) throws StripeException {

        String successURL = baseURL + "payment/success";
        String failedURL = baseURL + "payment/failed";

        Stripe.apiKey = API_SECRET_KEY;

        List<SessionCreateParams.LineItem> sessionItemsList = new ArrayList<>();
        for (StripePaymentDTO stripePaymentDTO : stripePaymentDTOList) {
            sessionItemsList.add(createSessionLineItem(stripePaymentDTO));
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCancelUrl(failedURL)
                .addAllLineItem(sessionItemsList)
                .setSuccessUrl(successURL)
                .build();
        return Session.create(params);
    }
}
