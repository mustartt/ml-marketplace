package com.mlmarketplace.mlmp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private String firstname;

    private String lastname;

    @JsonProperty("profile_img")
    private String profileImage;

}
