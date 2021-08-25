package com.niccko.Chat.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MessageDto {
    private String text;
    private int fromId;
    private Date date;
    private String roomId;
}
