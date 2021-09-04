package com.mlmarketplace.mlmp.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageResponseDTO<E> {

    @JsonProperty("content")
    private List<E> content;

    @JsonProperty("page")
    private int page;

    @JsonProperty("page_size")
    private int pageSize;

    @JsonProperty("total_size")
    private long totalSize;

    @JsonProperty("total_pages")
    private long totalPages;

}
