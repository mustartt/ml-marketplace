package com.mlmarketplace.mlmp.service.validator.model;

import com.mlmarketplace.mlmp.dto.response.ModifyModelResponse;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import com.mlmarketplace.mlmp.service.validator.RequestValidationResult;
import com.mlmarketplace.mlmp.service.validator.RequestValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DeleteModelValidator implements RequestValidator<Long, ModifyModelResponse> {

    private final ModelsRepository modelsRepository;

    @Override
    public RequestValidationResult<ModifyModelResponse> validate(final Long id) {
        if (modelsRepository.findById(id).isEmpty()) {
            return RequestValidationResult.fail(createModelDoesNotExists());
        }

        return RequestValidationResult.valid();
    }

    private static ModifyModelResponse createModelDoesNotExists() {
        return ModifyModelResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .error("Model does not exists!")
                .build();
    }
}
