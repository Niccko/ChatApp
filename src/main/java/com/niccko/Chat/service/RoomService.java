package com.niccko.Chat.service;

import com.niccko.Chat.model.ChatRoom;
import com.niccko.Chat.model.Message;
import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.RoomRepository;
import com.niccko.Chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    private String generateId() {
        return RandomString.make(6).toUpperCase(Locale.ROOT);
    }

    public ChatRoom getById(String roomId) {
        return roomRepository.findChatRoomById(roomId);
    }

    public ChatRoom createRoom(String name, int maxCapacity, boolean visible, User owner) {
        ChatRoom room = new ChatRoom();
        String id = generateId();
        while (getById(id) != null) {
            id = generateId();
        }
        room.setId(id);
        room.setMaxCapacity(maxCapacity);
        room.setName(name);
        room.setVisible(visible);
        room.setUsers(new HashSet<>());
        room.setOwner(owner);
        roomRepository.save(room);
        return room;
    }

    public User addUser(String roomId, long userId) {
        ChatRoom room = getById(roomId);
        var users = room.getUsers();
        if (users.size() < room.getMaxCapacity()) {
            User user = userRepository.findById(userId);
            if (!users.contains(user)) {
                users.add(user);
                room.setUsers(users);
                ;
                roomRepository.save(room);
                return user;
            }
        }
        return null;
    }

    public User addUser(String roomId, String login) {
        ChatRoom room = getById(roomId);
        var users = room.getUsers();
        if (users.size() < room.getMaxCapacity()) {
            User user = userRepository.findByLogin(login);
            if (!users.contains(user)) {
                users.add(user);
                room.setUsers(users);
                ;
                roomRepository.save(room);
                return user;
            }
        }
        return null;
    }

    public User deleteUser(String roomId, long userId) {
        ChatRoom room = getById(roomId);
        var users = room.getUsers();
        User user = userRepository.findById(userId);
        if (users.contains(user)) {
            users.remove(user);
            room.setUsers(users);
            roomRepository.save(room);
            return user;
        }
        return null;
    }

    public List<ChatRoom> findAllVisible(String login, boolean isAdmin) {
        if (isAdmin)
            return roomRepository.findAll();
        User user = userRepository.findByLogin(login);
        return roomRepository.findAllByUsersContainingOrVisible(user, true);
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }

    public List<Message> getHistory(String roomId, int count) {
        ChatRoom room = roomRepository.findChatRoomById(roomId);
        Set<Message> messages = room.getMessages();
        List<Message> sorted = messages.stream().sorted(Comparator.comparing(Message::getDate)).collect(Collectors.toList());
        return sorted.subList(sorted.size()-Math.min(sorted.size(),count), sorted.size());
    }
}
