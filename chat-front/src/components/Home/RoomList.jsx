import React, {Component} from 'react'

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
            headers: {'Authorization': "Bearer " + localStorage.getItem('jwt')},
        };
        fetch(log_endpoint, requestOptions)
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
            <div className={'roomlist-container'}>
                <ul>
                    {rooms.map((room, i) => <li key={room.id}>{room.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default RoomList;