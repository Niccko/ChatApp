package com.niccko.Chat.model;

import lombok.Data;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="chatrooms")
public class ChatRoom {

    @Id
    private String id;
    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinTable(name = "room_users",
            joinColumns = {@JoinColumn(name = "room_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name="user_id",referencedColumnName = "id")})
    private List<User> users;
    @ManyToOne()
    @JoinColumn(name = "ownerId")
    private User owner;
    private int maxCapacity;
    private String name;
    private boolean visible;
}
