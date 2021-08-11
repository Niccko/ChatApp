package com.niccko.Chat.controller;

import com.niccko.Chat.dto.CreateRoomDto;
import com.niccko.Chat.dto.UserDto;
import com.niccko.Chat.model.ChatRoom;
import com.niccko.Chat.model.User;
import com.niccko.Chat.service.RoomService;
import com.niccko.Chat.service.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestWrapper;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/create")
    public ChatRoom createRoom(@RequestBody CreateRoomDto request, Principal principal) {
        ChatRoom room = roomService.createRoom(request.getName(), request.getMaxCapacity(), request.isVisible());
        String login = principal.getName();
        roomService.addUser(room.getId(), login);
        return roomService.getById(room.getId());
    }

    @PostMapping("/add/{id}")
    public User addUser(@PathVariable String id, @RequestBody UserDto request) {
        return roomService.addUser(id, request.getLogin());
    }

    @PostMapping("/remove/{id}")
    public User removeUser(@PathVariable String id, @RequestBody UserDto request) {
        return roomService.deleteUser(id, request.getLogin());
    }

    @GetMapping("/list")
    public List<ChatRoom> getAll(SecurityContextHolderAwareRequestWrapper requestWrapper){
        return roomService.findAll(requestWrapper.isUserInRole("ADMIN"));
    }
}
