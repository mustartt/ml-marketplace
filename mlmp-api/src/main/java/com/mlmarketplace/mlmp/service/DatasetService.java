package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.dto.DatasetResponseDTO;
import com.mlmarketplace.mlmp.dto.mapper.DatasetResponseMapper;
import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.repository.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class DatasetService {

    private final DatasetRepository datasetRepository;

    public Page<DatasetResponseDTO> getAllDatasets(final Pageable pageable) {
        return datasetRepository.findAll(pageable)
                .map(DatasetResponseMapper::map);
    }

    public DatasetResponseDTO getDatasetById(final Long id) {
        final var result = datasetRepository.findById(id)
                .orElseThrow();

        return DatasetResponseMapper.map(result);
    }

    public void addDataset(Dataset dataset) {
        datasetRepository.save(dataset);
    }

    public void updateDataset(Dataset dataset) {
        datasetRepository.save(dataset);
    }

    public void deleteDataset(Dataset dataset) {
        datasetRepository.delete(dataset);
    }
}