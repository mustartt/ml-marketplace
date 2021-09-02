package com.mlmarketplace.mlmp.service;

import javax.transaction.Transactional;

import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.dto.mapper.ModelResponseMapper;
import com.mlmarketplace.mlmp.dto.mapper.PriceRangeMapper;
import com.mlmarketplace.mlmp.dto.request.ModelRequest;
import com.mlmarketplace.mlmp.dto.request.UpdateModelRequest;
import com.mlmarketplace.mlmp.dto.response.ModifyModelResponse;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import com.mlmarketplace.mlmp.service.validator.model.CreateModelValidator;
import com.mlmarketplace.mlmp.service.validator.model.DeleteModelValidator;
import com.mlmarketplace.mlmp.service.validator.model.UpdateModelValidator;
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
    private final UpdateModelValidator updateModelValidator;
    private final DeleteModelValidator deleteModelValidator;

    public Page<ModelResponseDTO> search(final String search,
                                         final String category,
                                         final String framework,
                                         final String format,
                                         final PriceRangeMapper range,
                                         Pageable pageable) {
        return modelsRepository.search(
                        search,
                        category, framework, format,
                        range.getLowerbound(), range.getUpperbound(),
                        pageable)
                .map(ModelResponseMapper::map);
    }

    public ModelResponseDTO getModelsById(final Long id) {
        final var result = modelsRepository.findById(id)
                .orElseThrow();

        return ModelResponseMapper.map(result);
    }

    public ModifyModelResponse createModel(final ModelRequest request) {
        final var validationResult = createModelValidator.validate(request);
        if (validationResult.isFailed()) {
            return validationResult.getErrorResponse();
        }

        final var currentUser = userService.getCurrentAuthenticatedUser();
        if (currentUser.isEmpty()) {
            return ModifyModelResponse.builder()
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

        return ModifyModelResponse.builder()
                .status(HttpStatus.OK.value())
                .newModelID(newModel.getId())
                .build();
    }

    @Transactional
    public ModifyModelResponse updateModels(final Long id, final ModelRequest request) {

        final var currentUser = userService.getCurrentAuthenticatedUser();
        if (currentUser.isEmpty()) {
            return ModifyModelResponse.builder()
                    .status(HttpStatus.FORBIDDEN.value())
                    .error("Cannot find current authenticated user!")
                    .build();
        }

        final var compositeRequest = getUpdateRequest(request);
        compositeRequest.setId(id);
        compositeRequest.setUser(currentUser.get());
        final var validationResult = updateModelValidator.validate(compositeRequest);

        if (validationResult.isFailed()) {
            return validationResult.getErrorResponse();
        }

        final var existingModel = modelsRepository.getModelById(id).orElseThrow();
        existingModel.setName(request.getName());
        existingModel.setCategory(request.getCategory());
        existingModel.setFramework(request.getFramework());
        existingModel.setFormat(request.getFormat());
        existingModel.setPublisher(currentUser.get());
        existingModel.setExcerpt(request.getExcerpt());
        existingModel.setDescription(request.getDescription());
        existingModel.setTags(String.join("|", request.getTags()));
        existingModel.setPrice(request.getPrice());

        return ModifyModelResponse.builder()
                .status(HttpStatus.OK.value())
                .newModelID(existingModel.getId())
                .build();
    }

    public ModifyModelResponse deleteModels(final Long id) {
        final var validationResult = deleteModelValidator.validate(id);
        if (validationResult.isFailed()) {
            return validationResult.getErrorResponse();
        }

        modelsRepository.deleteById(id);

        return ModifyModelResponse.builder()
                .status(HttpStatus.OK.value())
                .newModelID(id)
                .build();
    }

    private UpdateModelRequest getUpdateRequest(final ModelRequest request) {
        return UpdateModelRequest.builder()
                .name(request.getName())
                .category(request.getCategory())
                .framework(request.getFramework())
                .format(request.getFormat())
                .excerpt(request.getExcerpt())
                .description(request.getDescription())
                .tags(request.getTags())
                .price(request.getPrice())
                .build();
    }
}
