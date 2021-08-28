package com.mlmarketplace.mlmp.service.validator;

@FunctionalInterface
public interface RequestValidator<I, O> {

    RequestValidationResult<O> validate(final I request);

}
