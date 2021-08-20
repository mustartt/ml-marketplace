package com.mlmarketplace.mlmp.service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mlmarketplace.mlmp.configurations.JwtProps;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@EnableConfigurationProperties(JwtProps.class)
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtProps jwtProps;

    public String createAccessToken(final String username,
                                    final List<String> roles,
                                    final HttpServletRequest request) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtProps.getAccessTokenExpiration()))
                .withIssuer(request.getRequestURI())
                .withClaim("roles", roles)
                .sign(Algorithm.HMAC256(jwtProps.getSecret().getBytes()));
    }

    public String createRefreshToken(final String username,
                                     final HttpServletRequest request) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtProps.getRefreshTokenExpiration()))
                .withIssuer(request.getRequestURI())
                .sign(Algorithm.HMAC256(jwtProps.getSecret().getBytes()));
    }

    public HashMap<String, String> writeTokens(final String accessToken,
                                               final String refreshToken) {
        final var body = new HashMap<String, String>();

        body.put("access_token", accessToken);
        body.put("refresh_token", refreshToken);

        return body;
    }

    public HashMap<String, String> getTokenErrorResponse(final String message) {
        final var body = new HashMap<String, String>();
        body.put("error", message);
        body.put("status", "" + HttpStatus.FORBIDDEN.value());
        return body;
    }

    public Optional<String> getToken(final HttpServletRequest request) {
        final var authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            final var token = authHeader.substring("Bearer ".length());
            return Optional.of(token);
        }
        return Optional.empty();
    }

    public DecodedJWT decodeJwt(final String token) {
        final var algorithm = Algorithm.HMAC256(jwtProps.getSecret().getBytes());
        final var verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

}
