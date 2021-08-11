package com.niccko.Chat.repository;

import com.niccko.Chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<ChatRoom, String> {
    ChatRoom findChatRoomById(String id);
    List<ChatRoom> findChatRoomsByName(String name);
    List<ChatRoom> findAllByVisible(boolean vis);
}
