import React, {Component} from 'react'
import {authFetch} from "../../../authentication/AuthProvider";
import styles from "../home.module.css"
import Room from "./Room";

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        const log_endpoint = 'http://localhost:8075/room/list';
        const requestOptions = {
            method: 'GET',
            headers: {}
        };
        authFetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    this.setState({rooms: data})
                }

            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
            });
    }

    render() {
        const rooms = this.state.rooms;
        return (
            <div className={styles.roomlistContainer}>
                <ul className={styles.roomList}>
                    {rooms.map((room, i) => <Room key={i} room={room}/>)}
                </ul>
            </div>)
    }
}

export default RoomList;