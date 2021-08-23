import React, {useEffect, useState} from 'react'
import {authFetch} from "../../../authentication/AuthProvider";
import styles from "../home.module.css"
import Room from "./Room";


function RoomList() {

    const [rooms, setRooms] = useState([])

    const updateRooms = () => {
        const log_endpoint = 'http://localhost:8075/room/list';
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        authFetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setRooms(data);
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        updateRooms()
    }, [])

    return (
        <div className={styles.roomlistContainer}>
            <ul className={styles.roomList}>
                {rooms.map((room, i) => <Room key={i} room={room} updateRooms={updateRooms}/>)}
            </ul>
            {rooms.length===0 && <h4 className={styles.noRoomText}>No rooms available</h4>}
        </div>)

}

export default RoomList;