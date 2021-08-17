package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.configurations.PageProps;
import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.dto.mapper.ModelResponseMapper;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ModelsService {

    private final ModelsRepository modelsRepository;

    public Page<ModelResponseDTO> getAllModels(final Pageable pageable) {
        return modelsRepository.findAll(pageable)
                .map(ModelResponseMapper::map);
    }

    public ModelResponseDTO getModelsById(final Long id) {
        final var result = modelsRepository.findById(id)
                .orElseThrow();

        return ModelResponseMapper.map(result);
    }

    public void addModels(Model models) {
        modelsRepository.save(models);
    }

    public void updateModels(Model models) {
        modelsRepository.save(models);
    }

    public void deleteModels(Model models) {
        modelsRepository.delete(models);
    }
}
