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


}
