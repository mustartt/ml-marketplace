package com.mlmarketplace.mlmp.service.validator;

import java.util.List;

public class RequestValidatorSequence<I, O> {

    public RequestValidationResult<O> validate(final List<? extends RequestValidator<I, O>> validators,
                                               final I request) {

        var result = RequestValidationResult.<O>valid();
        for (final var validator : validators) {
            result = result.whenValidThenContinueWith(() -> validator.validate(request));
        }
        return result;
    }
}
