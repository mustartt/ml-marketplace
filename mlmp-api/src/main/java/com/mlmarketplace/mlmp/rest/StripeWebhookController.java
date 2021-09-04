package com.mlmarketplace.mlmp.rest;


import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.*;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    //TODO: Always return response.status(200) for frontend
    @PostMapping("/stripe/events")
    public String handleStripeEvent(@RequestHeader("Stripe-Signature") String sigHeader, @RequestBody String payload) {
        if (sigHeader == null) return "";
        Event event = null;
        try {
            event = ApiResource.GSON.fromJson(payload, Event.class);
        } catch (JsonSyntaxException e) {
            System.out.println("⚠️  Webhook error while parsing basic request.");
            return "";
        }
        // Deserialize the nested object inside the event
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            throw new IllegalStateException(
                    String.format("Unable to deserialize event data object for %s", event));
        }


        // Handle the event
        switch (event.getType()) {
            case "payment_intent.succeeded":
                PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                System.out.println("Payment for " + paymentIntent.getAmount() + " succeeded.");
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                break;
            case "payment_method.attached":
                PaymentMethod paymentMethod = (PaymentMethod) stripeObject;
                handlePaymentMethodAttached(paymentMethod);
                break;
            default:
                System.out.println("Unhandled event type: " + event.getType());
                break;
        }
        return "";
    }

    //TODO: What happens when payment is successful
    public void handlePaymentMethodAttached(PaymentMethod paymentMethod) {

    }
}
