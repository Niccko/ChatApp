import {useState} from "react";
import styles from "../home.module.css"

function Room(props) {
    const [info, setInfo] = useState({name: props.room.name, numMembers: props.room.users.length})
    return (
        <button className={styles.room}>
            <li key={props.room.id}>
                <div className={styles.roomName}>{props.room.name}</div>
                <div className={styles.userCount}>{info.numMembers}/{props.room.maxCapacity}</div>
            </li>
        </button>
    )

}

export default Room;