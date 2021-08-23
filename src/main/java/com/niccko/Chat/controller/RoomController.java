package com.niccko.Chat.controller;

import com.niccko.Chat.dto.CreateRoomDto;
import com.niccko.Chat.dto.UserDto;
import com.niccko.Chat.model.ChatRoom;
import com.niccko.Chat.model.User;
import com.niccko.Chat.repository.UserRepository;
import com.niccko.Chat.service.RoomService;
import com.niccko.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestWrapper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final UserRepository userRepository;


    @PostMapping("/create")
    public ChatRoom createRoom(@RequestBody CreateRoomDto request, Principal principal) {
        User user = userRepository.findByLogin(principal.getName());
        ChatRoom room = roomService.createRoom(request.getName(), request.getMaxCapacity(), request.isVisible(), user);
        roomService.addUser(room.getId(), user.getId());
        return roomService.getById(room.getId());
    }

    @PostMapping("/add/{id}")
    public User addUser(@PathVariable String id, @RequestBody UserDto request) {
        return roomService.addUser(id, request.getId());
    }

    @PostMapping("/remove/{id}")
    public User removeUser(@PathVariable String id, @RequestBody UserDto request) {
        return roomService.deleteUser(id, request.getId());
    }

    @GetMapping("/list")
    public List<ChatRoom> getAll(SecurityContextHolderAwareRequestWrapper requestWrapper) {
        String login = requestWrapper.getUserPrincipal().getName();
        return roomService.findAllVisible(login, requestWrapper.isUserInRole("ADMIN"));
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
    }

    @GetMapping("/owner")
    public boolean isOwner(@RequestParam String roomId, @RequestParam long userId) {
        ChatRoom room = roomService.getById(roomId);
        return room.getOwner().getId() == userId;
    }
}
