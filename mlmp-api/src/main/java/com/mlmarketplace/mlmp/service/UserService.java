package com.mlmarketplace.mlmp.service;

import java.util.List;

import com.mlmarketplace.mlmp.dto.RegisterUserRequest;
import com.mlmarketplace.mlmp.dto.UserResponse;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;

public interface UserService {
    User saveUser(final User user);
    Role saveRole(final Role role);
    void addRoleToUser(final String username, String roleName);
    User getUser(final String username);
    List<UserResponse> getUsers();
    UserResponse registerUser(final RegisterUserRequest request);
}
