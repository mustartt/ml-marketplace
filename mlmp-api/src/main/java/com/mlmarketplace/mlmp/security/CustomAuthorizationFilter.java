package com.mlmarketplace.mlmp.security;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class CustomAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/api/user/auth") || request.getServletPath().equals("/api/user/refresh")) {
            filterChain.doFilter(request, response);
        } else {
            final var authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                try {
                    final var token = authHeader.substring("Bearer ".length());
                    final var algorithm = Algorithm.HMAC256("secret".getBytes());
                    final var verifier = JWT.require(algorithm).build();
                    final var decodedJwt = verifier.verify(token);

                    final var username = decodedJwt.getSubject();
                    final var roles = decodedJwt.getClaim("roles").asArray(String.class);

                    final var authorities = new ArrayList<SimpleGrantedAuthority>();
                    Arrays.stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    response.setStatus(HttpStatus.FORBIDDEN.value());

                    final var body = new HashMap<String, String>();
                    body.put("error", e.getMessage());
                    body.put("status", "" + HttpStatus.FORBIDDEN.value());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), body);
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }
}

