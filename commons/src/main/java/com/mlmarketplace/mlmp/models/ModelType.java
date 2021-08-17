package com.mlmarketplace.mlmp.models;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ModelType {

    MODEL("MODEL"),
    DATASET("DATASET");

    @JsonValue
    private final String databaseValue;

    public static ModelType fromDatabaseValue(final String value) {
        return Arrays.stream(values())
                .filter(it -> it.getDatabaseValue().equals(value))
                .findFirst()
                .orElse(null);
    }

}
