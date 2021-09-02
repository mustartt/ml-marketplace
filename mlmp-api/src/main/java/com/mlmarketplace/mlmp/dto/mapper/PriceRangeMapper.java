package com.mlmarketplace.mlmp.dto.mapper;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class PriceRangeMapper {

    private Double lowerbound;
    private Double upperbound;

    public PriceRangeMapper(@Nullable final String format) {
        if (format == null) {
            this.lowerbound = 0.0;
            this.upperbound = Double.MAX_VALUE;
        } else {
            final var splitIndex = format.indexOf(',');
            final var lower = format.substring(0, splitIndex);
            final var upper = format.substring(splitIndex + 1);

            try {
                this.lowerbound = Double.parseDouble(lower);
            } catch (NumberFormatException exception) {
                this.lowerbound = 0.0;
            }

            try {
                this.upperbound = Double.parseDouble(upper);
            } catch (NumberFormatException exception) {
                this.upperbound = Double.MAX_VALUE;
            }
        }
    }
}
