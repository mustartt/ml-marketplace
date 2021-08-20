package com.mlmarketplace.mlmp.repository;

import java.util.Optional;

import com.mlmarketplace.mlmp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(final String username);

}
