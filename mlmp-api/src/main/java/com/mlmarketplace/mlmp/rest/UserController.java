package com.mlmarketplace.mlmp.rest;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;
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
        final var authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                final var refreshToken = authHeader.substring("Bearer ".length());
                final var algorithm = Algorithm.HMAC256("secret".getBytes());
                final var verifier = JWT.require(algorithm).build();
                final var decodedJwt = verifier.verify(refreshToken);

                final var username = decodedJwt.getSubject();
                final var user = userService.getUser(username);

                String accessToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURI())
                        .withClaim("roles", user.getRoles().stream()
                                .map(Role::getName).collect(Collectors.toList()))
                        .sign(Algorithm.HMAC256("secret".getBytes()));
                String newRefreshToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 50 * 60 * 1000))
                        .withIssuer(request.getRequestURI())
                        .sign(Algorithm.HMAC256("secret".getBytes()));

                final var body = new HashMap<String, String>();
                body.put("access_token", accessToken);
                body.put("refresh_token", newRefreshToken);

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), body);
            } catch (Exception e) {
                response.setStatus(HttpStatus.FORBIDDEN.value());

                final var body = new HashMap<String, String>();
                body.put("error", e.getMessage());
                body.put("status", "" + HttpStatus.FORBIDDEN.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), body);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
