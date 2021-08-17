package com.mlmarketplace.mlmp.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "page")
public class PageProps {

    private int size;

}
