import {useEffect, useState} from "react";
import styles from "../home.module.css"
import {authFetch, getUserData} from "../../../authentication/AuthProvider";

function Room(props) {
    const [info,setInfo] = useState(props.room)

    const deleteRoom=()=>{
        const log_endpoint = `http://localhost:8075/room/delete/`+props.room.id;
        const requestOptions = {
            method: 'DELETE',
            headers: {},
        };
        authFetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                props.updateRooms();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(()=>{
        setInfo(props.room)
    }, [props.room])

    const canDelete = ()=>{
        const userData = getUserData();
        return props.room.owner.login===userData.login || userData.roles.indexOf("ROLE_ADMIN")>-1
     }
    return (
        <div className={styles.roomContainer}>
            <button className={styles.room}>
                <li key={props.room.id}>
                    <div className={styles.roomName}>{info.name}</div>
                    <div className={styles.userCount}>&nbsp;&nbsp; {info.id} &nbsp;{info.users.length}/{info.maxCapacity}</div>
                </li>
            </button>
            {canDelete() && <button onClick={deleteRoom} className={styles.deleteButton}>Delete</button>}
        </div>
    )

}

export default Room;