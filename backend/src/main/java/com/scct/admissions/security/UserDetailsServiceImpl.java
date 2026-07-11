package com.scct.admissions.security;

import com.scct.admissions.entity.AdminUser;
import com.scct.admissions.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser adminUser = adminUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin user not found with username: " + username));

        if (!adminUser.getIsActive()) {
            throw new UsernameNotFoundException("Admin user account is inactive: " + username);
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(adminUser.getUsername())
                .password(adminUser.getPasswordHash())
                .authorities("ROLE_" + adminUser.getRole().name()) // Prefixes role to ROLE_ADMISSIONS_STAFF
                .build();
    }
}
