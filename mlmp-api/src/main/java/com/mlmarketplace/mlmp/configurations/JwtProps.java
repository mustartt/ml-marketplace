package com.mlmarketplace.mlmp.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProps {

    private String secret;
    private Long accessTokenExpiration;
    private Long refreshTokenExpiration;

}
