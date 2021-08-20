package com.mlmarketplace.mlmp.repository;

import com.mlmarketplace.mlmp.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(final String name);

}
