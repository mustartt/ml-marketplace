package com.mlmarketplace.mlmp.dto.mapper;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.models.Model;

public class ModelResponseMapper {
    public static ModelResponseDTO map(final Model model) {
        return ModelResponseDTO.builder()
                .name(model.getName())
                .category(model.getCategory())
                .framework(model.getFramework())
                .format(model.getFormat())
                .excerpt(model.getExcerpt())
                .description(model.getDescription())
                .tags(Arrays.stream(model.getTags().split(","))
                        .collect(Collectors.toList()))
                .price(model.getPrice())
                .createDate(model.getCreateDate())
                .updateDate(model.getUpdateDate())
                .build();
    }
}
