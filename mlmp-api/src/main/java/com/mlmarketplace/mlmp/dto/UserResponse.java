package com.mlmarketplace.mlmp.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mlmarketplace.mlmp.models.UserProfile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("email")
    private String email = "";

    @JsonProperty("roles")
    private List<String> roles = List.of();

    @JsonProperty("details")
    private UserProfileResponse userProfile;

}
