package com.mlmarketplace.mlmp.service.validator.model;

import com.mlmarketplace.mlmp.dto.request.UpdateModelRequest;
import com.mlmarketplace.mlmp.dto.response.ModifyModelResponse;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import com.mlmarketplace.mlmp.service.validator.RequestValidationResult;
import com.mlmarketplace.mlmp.service.validator.RequestValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UpdateModelValidator implements RequestValidator<UpdateModelRequest, ModifyModelResponse> {

    private final ModelsRepository modelsRepository;

    @Override
    public RequestValidationResult<ModifyModelResponse> validate(UpdateModelRequest request) {
        final var model = modelsRepository.getModelById(request.getId());
        if (model.isEmpty()) {
            return RequestValidationResult.fail(createModelNotFoundResponse());
        }

        if (request.getName() == null || request.getName().isBlank()) {
            return RequestValidationResult.fail(createFailedEmptyNameResponse());
        }

        if (request.getUser() == null) {
            return RequestValidationResult.fail(createInvalidUser());
        }

        if (modelsRepository.getModelByPublisherAndName(request.getUser(), request.getName()).isPresent()) {
            return RequestValidationResult.fail(createModelNameAlreadyExists());
        }
        return RequestValidationResult.valid();
    }

    private static ModifyModelResponse createModelNotFoundResponse() {
        return ModifyModelResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .error("Cannot find existing model!")
                .build();
    }

    private static ModifyModelResponse createInvalidUser() {
        return ModifyModelResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Invalid request user!")
                .build();
    }

    private static ModifyModelResponse createFailedEmptyNameResponse() {
        return ModifyModelResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Model name cannot be empty!")
                .build();
    }

    private static ModifyModelResponse createModelNameAlreadyExists() {
        return ModifyModelResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Model name already exists under the same user!")
                .build();
    }
}
