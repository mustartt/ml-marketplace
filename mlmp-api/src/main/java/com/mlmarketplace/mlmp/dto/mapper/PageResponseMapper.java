package com.mlmarketplace.mlmp.dto.mapper;

import com.mlmarketplace.mlmp.dto.PageResponseDTO;
import org.springframework.data.domain.Page;

public class PageResponseMapper {
    public static <E> PageResponseDTO<E> map(Page<E> page) {

        final var pageable = page.getPageable();

        return PageResponseDTO.<E>builder()
                .content(page.getContent())
                .page(pageable.getPageNumber())
                .pageSize(pageable.getPageSize())
                .size(page.getTotalElements())
                .totalSize(page.getTotalPages())
                .build();
    }
}
