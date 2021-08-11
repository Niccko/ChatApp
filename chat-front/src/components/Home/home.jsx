import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import RoomList from "./RoomList";
import styles from "./home.css"

class Home extends Component{
    render(){
        const authOk = this.props.user;
        return (
            <div className={styles.homeContainer}>
                {authOk && <Redirect to={'/login'}/>}
                <RoomList/>
            </div>
        )
    }
}

export default Home;