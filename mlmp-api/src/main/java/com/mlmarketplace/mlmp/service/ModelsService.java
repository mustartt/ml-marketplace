package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.dto.mapper.ModelResponseMapper;
import com.mlmarketplace.mlmp.dto.request.CreateModelRequest;
import com.mlmarketplace.mlmp.dto.response.CreateModelResponse;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import com.mlmarketplace.mlmp.service.validator.model.CreateModelValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ModelsService {

    private final ModelsRepository modelsRepository;
    private final UserService userService;
    private final CreateModelValidator createModelValidator;

    public Page<ModelResponseDTO> getAllModels(final Pageable pageable) {
        return modelsRepository.findAll(pageable)
                .map(ModelResponseMapper::map);
    }

    public ModelResponseDTO getModelsById(final Long id) {
        final var result = modelsRepository.findById(id)
                .orElseThrow();

        return ModelResponseMapper.map(result);
    }

    public CreateModelResponse createModel(final CreateModelRequest request) {
        final var validationResult = createModelValidator.validate(request);
        if (validationResult.isFailed()) {
            return validationResult.getErrorResponse();
        }

        final var currentUser = userService.getCurrentAuthenticatedUser();
        if (currentUser.isEmpty()) {
            return CreateModelResponse.builder()
                    .status(HttpStatus.FORBIDDEN.value())
                    .error("Cannot find current authenticated user!")
                    .build();
        }

        final var newModel = Model.builder()
                .name(request.getName())
                .category(request.getCategory())
                .framework(request.getFramework())
                .format(request.getFormat())
                .publisher(currentUser.get())
                .excerpt(request.getExcerpt())
                .description(request.getDescription())
                .tags(String.join("|", request.getTags()))
                .price(request.getPrice())
                .build();

        modelsRepository.save(newModel);

        return CreateModelResponse.builder()
                .status(HttpStatus.OK.value())
                .newModelID(newModel.getId())
                .build();
    }

    public void updateModels(Model models) {

    }

    public void deleteModels(Model models) {

    }
}
