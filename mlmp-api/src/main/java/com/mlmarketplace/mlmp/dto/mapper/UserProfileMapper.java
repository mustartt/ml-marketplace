package com.mlmarketplace.mlmp.dto.mapper;

import com.mlmarketplace.mlmp.dto.UserProfileResponse;
import com.mlmarketplace.mlmp.models.UserProfile;

public class UserProfileMapper {

    public static UserProfileResponse map(final UserProfile userProfile) {
        return UserProfileResponse.builder()
                .firstname(userProfile.getFirstname())
                .lastname(userProfile.getLastname())
                .profileImage(userProfile.getProfileImage())
                .build();
    }

}
