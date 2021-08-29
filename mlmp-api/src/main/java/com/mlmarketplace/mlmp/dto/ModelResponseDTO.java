package com.mlmarketplace.mlmp.dto;

import java.util.Date;
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
public class ModelResponseDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("category")
    private String category;

    @JsonProperty("framework")
    private String framework;

    @JsonProperty("format")
    private String format;

    @JsonProperty("publisher")
    private UserResponse publisher;

    @JsonProperty("excerpt")
    private String excerpt;

    @JsonProperty("description")
    private String description;

    @JsonProperty("tags")
    private List<String> tags;

    @JsonProperty("price")
    private double price;

    @JsonProperty("created_at")
    private Date createDate;

    @JsonProperty("updated_at")
    private Date updateDate;

}
