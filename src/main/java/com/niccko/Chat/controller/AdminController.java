package com.niccko.Chat.controller;

import com.niccko.Chat.model.Role;
import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.RoleRepository;
import com.niccko.Chat.repository.UserRepository;
import com.niccko.Chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminController(UserService userService, UserRepository userRepository, RoleRepository roleRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/grant/{login}")
    public User grantAuthority(@PathVariable String login, @RequestBody String roleName){
        User user = userService.findByLogin(login);
        List<Role> roles = user.getRoles();
        roles.add(roleRepository.findByName(roleName));
        user.setRoles(roles);
        userRepository.save(user);
        return user;
    }

}
