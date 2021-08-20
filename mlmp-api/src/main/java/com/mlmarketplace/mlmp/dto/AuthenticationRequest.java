package com.mlmarketplace.mlmp.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class AuthenticationRequest implements Serializable {

    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;

}
