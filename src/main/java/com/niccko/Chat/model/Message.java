package com.niccko.Chat.model;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String text;
    private int fromId;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom room;
}
