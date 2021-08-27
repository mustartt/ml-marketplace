package com.mlmarketplace.mlmp.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.mlmarketplace.mlmp.dto.UserResponse;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;

public class UserResponseMapper {

    public static UserResponse map(final User user) {
        final var roles = user.getRoles();
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(roles == null ? List.of() : roles.stream()
                        .map(Role::getName)
                        .collect(Collectors.toList()))
                .userProfile(user.getUserProfile())
                .build();
    }

}
