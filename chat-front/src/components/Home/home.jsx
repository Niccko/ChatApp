import RoomList from "./RoomList/RoomList";
import styles from "./home.module.css"
import {logout, useAuth} from "../../authentication/AuthProvider";

import {useEffect, useState} from "react";
import CreateRoom from "./CreateRoom";
import {Redirect} from "react-router-dom";
import ChatRoom from "./Chatroom/ChatRoom";

function Home() {
    const [room, setRoom] = useState();
    const [creating, setCreating] = useState(false)
    const [logged] = useAuth()

    useEffect(() => {
        return null
    })


    if (!logged) {
        return (
            <Redirect to={"/login"}/>
        )
    }



    const createClose = (e) => {
        e.preventDefault()
        setCreating(false);
    }

    return (
        <div className={styles.homeContainer}>
            <button onClick={logout}>Logout</button>
            {!creating &&
            <button onClick={() => {
                setCreating(true);
                setRoom(null)
            }} className={styles.createRoomButton}>Create room</button>}
            {!room && !creating && <RoomList setRoom={setRoom}/>}
            {creating && <CreateRoom close={createClose}/>}
            {room && <ChatRoom setRoom={setRoom} room={room}/>}
        </div>

    )
}


export default Home;