package com.mlmarketplace.mlmp.service.validator.model;

import com.mlmarketplace.mlmp.dto.request.ModelRequest;
import com.mlmarketplace.mlmp.dto.response.ModifyModelResponse;
import com.mlmarketplace.mlmp.service.validator.RequestValidationResult;
import com.mlmarketplace.mlmp.service.validator.RequestValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CreateModelValidator implements RequestValidator<ModelRequest, ModifyModelResponse> {

    @Override
    public RequestValidationResult<ModifyModelResponse> validate(ModelRequest request) {
        if (request.getName() == null || request.getName().isBlank()) {
            return RequestValidationResult.fail(createFailedEmptyNameResponse());
        }

        return RequestValidationResult.valid();
    }

    private static ModifyModelResponse createFailedEmptyNameResponse() {
        return ModifyModelResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Model name cannot be empty!")
                .build();
    }
}
