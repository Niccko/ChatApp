package com.niccko.Chat.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String login;
    private String password;
    private String name;
}
