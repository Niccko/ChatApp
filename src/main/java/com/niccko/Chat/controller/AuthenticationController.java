package com.niccko.Chat.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niccko.Chat.dto.AuthenticationDto;
import com.niccko.Chat.dto.RegisterDto;

import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.UserRepository;
import com.niccko.Chat.security.JWTUtils;
import com.niccko.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final JWTUtils jwtUtils;

    @PostMapping("/register")
    public User register(@RequestBody RegisterDto request) throws javax.naming.AuthenticationException {
        if (userRepository.findByLogin(request.getLogin()) == null) {
            User user = new User();
            user.setLogin(request.getLogin());
            user.setPassword(request.getPassword());
            user.setName(request.getName());

            return userService.register(user);
        } else {
            throw new javax.naming.AuthenticationException("User with login '" + request.getLogin() + "' already exists");
        }
    }

    @PostMapping("/refresh")
    public @ResponseBody Map<String, String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("x-refresh-token");
        DecodedJWT decodedRefresh = jwtUtils.verifyRefresh(refreshToken);
        String login = decodedRefresh.getSubject();
        User user = userRepository.findByLogin(login);
        String accessToken = jwtUtils.generateToken(user, request.getRequestURL().toString(), false);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        response.setContentType(APPLICATION_JSON_VALUE);
        return tokens;
    }
}
