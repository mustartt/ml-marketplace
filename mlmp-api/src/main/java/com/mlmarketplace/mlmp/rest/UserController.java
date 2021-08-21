package com.mlmarketplace.mlmp.rest;


import java.util.List;
import java.util.stream.Collectors;

import com.mlmarketplace.mlmp.dto.RefreshTokenRequest;
import com.mlmarketplace.mlmp.dto.RegisterUserRequest;
import com.mlmarketplace.mlmp.dto.TokensResponse;
import com.mlmarketplace.mlmp.dto.UserResponse;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.service.JwtTokenProvider;
import com.mlmarketplace.mlmp.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping(path = "/users")
    public List<UserResponse> getUsers() {
        return userService.getUsers();
    }

    @PostMapping(path = "/user/save")
    public ResponseEntity<User> saveUser(@RequestBody final User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping(path = "/user/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserResponse registerUser(@NonNull @RequestBody final RegisterUserRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping(path = "/user/refresh", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public TokensResponse refreshToken(@NonNull @RequestBody final RefreshTokenRequest request) {
        final var decodedJwt = jwtTokenProvider.decodeJwt(request.getRefreshToken());

        final var username = decodedJwt.getSubject();
        final var user = userService.getUser(username);

        final var accessToken =
                jwtTokenProvider.createAccessToken(
                        user.getUsername(),
                        user.getRoles().stream()
                                .map(Role::getName)
                                .collect(Collectors.toList()));
        final var newRefreshToken =
                jwtTokenProvider.createRefreshToken(user.getUsername());

        return TokensResponse.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
