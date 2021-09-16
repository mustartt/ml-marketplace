package com.mlmarketplace.mlmp.dto.mapper;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.mlmarketplace.mlmp.dto.DatasetResponseDTO;
import com.mlmarketplace.mlmp.models.Dataset;

public class DatasetResponseMapper {

    public static DatasetResponseDTO map(final Dataset dataset) {
        return DatasetResponseDTO.builder()
                .name(dataset.getName())
                .category(dataset.getCategory())
                .framework(dataset.getFramework())
                .format(dataset.getFormat())
                .type(dataset.getType())
                .excerpt(dataset.getExcerpt())
                .description(dataset.getDescription())
                .tags(Arrays.stream(dataset.getTags().split(","))
                        .collect(Collectors.toList()))
                .price(dataset.getPrice())
                .createDate(dataset.getCreateDate())
                .updateDate(dataset.getUpdateDate())
                .build();
    }

}
