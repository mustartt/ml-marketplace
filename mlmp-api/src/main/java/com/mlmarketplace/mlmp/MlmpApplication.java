package com.mlmarketplace.mlmp;

import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MlmpApplication {

    public static void main(String[] args) {
        SpringApplication.run(MlmpApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService) {

        final var encoder = new BCryptPasswordEncoder();

        return args -> {
            userService.saveRole(Role.builder().name("ROLE_USER").build());
            userService.saveUser(User.builder()
                    .username("user1")
                    .password(encoder.encode("user1"))
                    .build());
            userService.addRoleToUser("user1", "ROLE_USER");
        };
    }
}
