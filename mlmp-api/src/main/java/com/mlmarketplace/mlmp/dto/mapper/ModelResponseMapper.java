package com.mlmarketplace.mlmp.dto.mapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.models.Model;

public class ModelResponseMapper {
    public static ModelResponseDTO map(final Model model) {

        final var tags = model.getTags() == null ?
                new ArrayList<String>() :
                Arrays.stream(model.getTags().split("\\|"))
                        .collect(Collectors.toList());

        return ModelResponseDTO.builder()
                .id(model.getId())
                .name(model.getName())
                .category(model.getCategory())
                .framework(model.getFramework())
                .format(model.getFormat())
                .excerpt(model.getExcerpt())
                .description(model.getDescription())
                .publisher(UserResponseMapper.map(model.getPublisher()))
                .tags(tags)
                .price(model.getPrice())
                .createDate(model.getCreateDate())
                .updateDate(model.getUpdateDate())
                .build();
    }
}
