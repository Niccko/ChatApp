package com.niccko.Chat.dto;

import lombok.Data;

@Data
public class CreateRoomDto {
    private String name;
    private boolean visible;
    private int maxCapacity;
}
