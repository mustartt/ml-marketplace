package com.mlmarketplace.mlmp.rest;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.service.JwtTokenProvider;
import com.mlmarketplace.mlmp.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping(path = "/user/save")
    public ResponseEntity<User> saveUser(@RequestBody final User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping(path = "/user/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final var refreshToken = jwtTokenProvider.getToken(request);
        if (refreshToken.isPresent()) {
            try {
                final var decodedJwt = jwtTokenProvider.decodeJwt(refreshToken.get());

                final var username = decodedJwt.getSubject();
                final var user = userService.getUser(username);

                final var accessToken =
                        jwtTokenProvider.createAccessToken(
                                user.getUsername(),
                                user.getRoles().stream()
                                        .map(Role::getName)
                                        .collect(Collectors.toList()),
                                request);
                final var newRefreshToken =
                        jwtTokenProvider.createRefreshToken(user.getUsername(), request);

                final var body = jwtTokenProvider.writeTokens(accessToken, newRefreshToken);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), body);
            } catch (Exception e) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                final var body = jwtTokenProvider.getTokenErrorResponse(e.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), body);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
