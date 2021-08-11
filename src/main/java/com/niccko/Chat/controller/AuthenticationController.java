package com.niccko.Chat.controller;

import com.niccko.Chat.dto.AuthenticationDto;
import com.niccko.Chat.dto.RegisterDto;
import com.niccko.Chat.model.User;

import com.niccko.Chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/auth/")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }



    @PostMapping("/register")
    public User register(@RequestBody RegisterDto request) throws javax.naming.AuthenticationException {
        if (userService.findByLogin(request.getLogin()) == null) {
            User user = new User();
            user.setLogin(request.getLogin());
            user.setPassword(request.getPassword());
            user.setName(request.getName());

            return userService.register(user);
        } else {
            throw new javax.naming.AuthenticationException("User with login '" + request.getLogin() + "' already exists");
        }
    }
}
