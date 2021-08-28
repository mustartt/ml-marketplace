package com.mlmarketplace.mlmp.service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mlmarketplace.mlmp.dto.RegisterUserRequest;
import com.mlmarketplace.mlmp.dto.UserResponse;
import com.mlmarketplace.mlmp.dto.mapper.UserResponseMapper;
import com.mlmarketplace.mlmp.models.Role;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.repository.RoleRepository;
import com.mlmarketplace.mlmp.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Optional<User> getCurrentAuthenticatedUser() {
        final var auth = SecurityContextHolder.getContext().getAuthentication();
        return this.getUser(auth.getName());
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public Optional<User> getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(UserResponseMapper::map)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse registerUser(final RegisterUserRequest request) {
        final var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        return UserResponseMapper.map(user);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        final var user = userRepository.findByUsername(s);
        if (user.isEmpty()) throw new UsernameNotFoundException("User not found");

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.get().getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));

        return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(), authorities);
    }
}
