package com.niccko.Chat.service;

import com.niccko.Chat.model.ChatRoom;
import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.RoomRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserService userService;

    @Autowired
    public RoomService(RoomRepository roomRepository, UserService userService) {
        this.roomRepository = roomRepository;
        this.userService = userService;
    }

    private String generateId() {
        return RandomString.make(6).toUpperCase(Locale.ROOT);
    }

    public ChatRoom getById(String roomId) {
        return roomRepository.findChatRoomById(roomId);
    }

    public ChatRoom createRoom(String name, int maxCapacity, boolean visible) {
        ChatRoom room = new ChatRoom();
        String id = generateId();
        while (getById(id) != null) {
            id = generateId();
        }
        room.setId(id);
        room.setMaxCapacity(maxCapacity);
        room.setName(name);
        room.setVisible(visible);
        room.setUsers(new ArrayList<>());
        roomRepository.save(room);
        return room;
    }

    public User addUser(String roomId, String userLogin) {
        ChatRoom room = getById(roomId);
        var users = room.getUsers();
        if (users.size() < room.getMaxCapacity()) {
            User user = userService.findByLogin(userLogin);
            if (!users.contains(user)) {
                users.add(user);
                room.setUsers(users);
                System.out.println(userLogin);
                roomRepository.save(room);
                return user;
            }
        }
        return null;
    }

    public User deleteUser(String roomId, String userLogin) {
        ChatRoom room = getById(roomId);
        var users = room.getUsers();
        User user = userService.findByLogin(userLogin);
        if (users.contains(user)) {
            users.remove(user);
            room.setUsers(users);
            roomRepository.save(room);
            return user;
        }
        return null;
    }

    public List<ChatRoom> findAll(boolean isAdmin) {
        if(isAdmin){
            return roomRepository.findAll();
        }
        return roomRepository.findAllByVisible(true);
    }
}
