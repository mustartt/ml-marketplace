package com.mlmarketplace.mlmp.configurations;

import java.util.Arrays;
import java.util.List;

import com.mlmarketplace.mlmp.security.CustomAuthenticationFilter;
import com.mlmarketplace.mlmp.security.CustomAuthorizationFilter;
import com.mlmarketplace.mlmp.service.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        //TODO: Remove /** when in production
        http.authorizeRequests()
                .antMatchers("/api/user/auth", "/api/user/refresh", "/api/user/register", "/**")
                .permitAll();
        http.authorizeRequests().anyRequest().authenticated();

        http.addFilter(customAuthenticationFilter());
        http.addFilterBefore(customAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    private CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        final var customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean(), jwtTokenProvider);
        customAuthenticationFilter.setFilterProcessesUrl("/api/user/auth");
        return customAuthenticationFilter;
    }

    private CustomAuthorizationFilter customAuthorizationFilter() {
        return new CustomAuthorizationFilter(jwtTokenProvider);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(List.of("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
