import {useEffect, useState} from "react";
import roomStyles from "./chatroom.module.css"
import {send} from "../../../websockets/WebsocketProvider";

function ChatRoom(props) {
    const [message, setMessage] = useState("")
    useEffect(() => {

    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        send("room/"+props.room.id,message);
        setMessage("")
    }

    return (
        <div className={roomStyles.chatRoomContainer}>
            <div className={roomStyles.chatRoomHeader}>
                <button onClick={() => props.setRoom(null)} className={roomStyles.icon}>
                    <div className={roomStyles.arrow}/>
                </button>
                <h1 className={roomStyles.roomInfo}>
                    {props.room.name}
                    <div className={roomStyles.numMembers}>
                        ({props.room.users.length} users out of {props.room.maxCapacity})
                    </div>
                </h1>
            </div>
            <hr/>
            <div className={roomStyles.messageBox}>
                <form onSubmit={sendMessage}>
                    <div className={roomStyles.formInner}>
                        <div className={"form-group"}>
                            <input onChange={e => setMessage(e.target.value)} value={message} type="text"/>
                            <input type="submit" value={"Send"}/>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatRoom;