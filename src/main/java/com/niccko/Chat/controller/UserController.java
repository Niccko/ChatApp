package com.niccko.Chat.controller;

import com.niccko.Chat.dto.RegisterDto;
import com.niccko.Chat.model.Role;
import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.RoleRepository;
import com.niccko.Chat.repository.UserRepository;
import com.niccko.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @GetMapping("")
    public @ResponseBody List<User> getAll(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable long id){
        return userRepository.findById(id);
    }

    @GetMapping("/{login}")
    public User getUser(@PathVariable String login){
        return userRepository.findByLogin(login);
    }


}
