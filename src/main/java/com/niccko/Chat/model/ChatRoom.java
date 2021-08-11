package com.niccko.Chat.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="chatrooms")
public class ChatRoom {

    @Id
    private String id;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "room_users",
            joinColumns = {@JoinColumn(name = "user_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name="room_id",referencedColumnName = "id")})
    private List<User> users;
    private int maxCapacity;
    private String name;
    private boolean visible;
}
