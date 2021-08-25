package com.niccko.Chat.controller;
import com.niccko.Chat.dto.MessageDto;
import com.niccko.Chat.model.ChatRoom;
import com.niccko.Chat.model.Message;
import com.niccko.Chat.repository.MessageRepository;
import com.niccko.Chat.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class MessageController {
    @Autowired private MessageRepository messageRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/room/{roomId}")
    public void rootMessage(@DestinationVariable String roomId, @Payload String message){
        MessageDto msg = new MessageDto();
        msg.setText(message);
        msg.setRoomId(roomId);
        msg.setDate(new Date());
        messagingTemplate.convertAndSend("/topic/room/"+roomId, msg);
    }
}
