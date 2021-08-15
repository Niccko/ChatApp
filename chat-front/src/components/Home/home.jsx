import RoomList from "./RoomList/RoomList";
import styles from "./home.module.css"
import {logout, useAuth} from "../../authentication/AuthProvider";
import {useState} from "react";


function Home() {
    const [room, setRoom] = useState();
    return (
        <div className={styles.homeContainer}>
            <button onClick={logout}>Logout</button>
            {!room && <RoomList/>}
        </div>

    )
}


export default Home;