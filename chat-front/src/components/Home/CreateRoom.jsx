import {useState} from "react";
import {authFetch} from "../../authentication/AuthProvider";
import styles from "./home.module.css"

function CreateRoom(props) {

    const [name, setName] = useState("")
    const [capacity, setCapacity] = useState(5)
    const [priv, setPriv] = useState(false)

    const submitHandler = (e) => {
        const log_endpoint = 'http://localhost:8075/room/create';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                visible: !priv,
                maxCapacity: capacity
            })
        };
        authFetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const clickHandler = () => {
        setPriv(!priv)
    }

    return (
        <div className={styles.createRoom}>
            <form style={{paddingTop: 5 + "px"}} onSubmit={submitHandler}>
                <div className="form-inner">
                    <button onClick={props.close} className={styles.close}/>
                    <div className="form-group">
                        <label htmlFor="roomName">Name</label>
                        <input type="text" name="roomName" id="roomName"
                               onChange={(e) =>
                                   setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxCapacity">Maximum capacity</label>
                        <input type="number" name="maxCapacity" id="maxCapacity" onChange={(e) =>
                            setCapacity(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="private">Private</label>
                        <input checked={priv} onChange={clickHandler} type="checkbox" name="private" id="private"/>
                    </div>
                    <input type="submit" value="Create"/>
                </div>
            </form>
        </div>
    )
}

export default CreateRoom;