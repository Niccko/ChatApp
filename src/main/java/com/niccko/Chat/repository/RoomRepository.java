package com.niccko.Chat.repository;

import com.niccko.Chat.model.ChatRoom;
import com.niccko.Chat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<ChatRoom, String>, JpaSpecificationExecutor<ChatRoom> {
    ChatRoom findChatRoomById(String id);
    List<ChatRoom> findChatRoomsByName(String name);
    List<ChatRoom> findAllByUsersContainingOrVisible(User user, boolean visible);
}
