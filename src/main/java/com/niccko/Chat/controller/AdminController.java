package com.niccko.Chat.controller;

import com.niccko.Chat.model.Role;
import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.RoleRepository;
import com.niccko.Chat.repository.UserRepository;
import com.niccko.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    @PostMapping("/grant/{login}")
    public User grantAuthority(@PathVariable String login, @RequestBody String roleName){
        User user = userRepository.findByLogin(login);
        Set<Role> roles = user.getRoles();
        roles.add(roleRepository.findByName(roleName));
        user.setRoles(roles);
        userRepository.save(user);
        return user;
    }

}
