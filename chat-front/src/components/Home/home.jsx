import {Redirect} from "react-router-dom";
import RoomList from "./RoomList";
import styles from "./home.css"
import {useAuth} from "../../authentication/AuthProvider";


function Home() {
    const [logged] = useAuth();
    return (
        <div className={styles.homeContainer}>
            {!logged && <Redirect to={'/login'}/>}
            <RoomList/>
        </div>

    )
}


export default Home;