package com.mlmarketplace.mlmp.service.validator;

import java.util.function.Supplier;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RequestValidationResult<E> {

    private final E errorResponse;

    public RequestValidationResult<E> whenValidThenContinueWith(@NonNull final Supplier<RequestValidationResult<E>> supplier) {
        if (isValid()) {
            return supplier.get();
        } else {
            return this;
        }
    }

    public static <E> RequestValidationResult<E> valid() {
        return new RequestValidationResult<>(null);
    }

    public static <E> RequestValidationResult<E> fail(@NonNull final E errorResponse) {
        return new RequestValidationResult<>(errorResponse);
    }

    public boolean isValid() {
        return errorResponse == null;
    }

    public boolean isFailed() {
        return !isValid();
    }

    public E getErrorResponse() {
        return errorResponse;
    }
}
