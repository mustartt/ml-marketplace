package com.mlmarketplace.mlmp.service.validator.model;

import com.mlmarketplace.mlmp.dto.request.CreateModelRequest;
import com.mlmarketplace.mlmp.dto.response.CreateModelResponse;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import com.mlmarketplace.mlmp.service.validator.RequestValidationResult;
import com.mlmarketplace.mlmp.service.validator.RequestValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CreateModelValidator implements RequestValidator<CreateModelRequest, CreateModelResponse> {

    @Override
    public RequestValidationResult<CreateModelResponse> validate(CreateModelRequest request) {
        if (request.getName() == null) {
            return RequestValidationResult.fail(createFailedEmptyNameResponse());
        }

        return RequestValidationResult.valid();
    }

    private static CreateModelResponse createFailedEmptyNameResponse() {
        return CreateModelResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Model name cannot be empty!")
                .build();
    }
}
