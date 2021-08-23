import RoomList from "./RoomList/RoomList";
import styles from "./home.module.css"
import {logout, useAuth} from "../../authentication/AuthProvider";
import {useEffect, useState} from "react";
import CreateRoom from "./CreateRoom";
import {Redirect} from "react-router-dom";


function Home() {
    const [room] = useState();
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
            <button onClick={() => setCreating(true)} className={styles.createRoomButton}>Create room</button>}
            {!room && !creating && <RoomList/>}
            {creating && <CreateRoom close={createClose}/>}
        </div>

    )
}


export default Home;