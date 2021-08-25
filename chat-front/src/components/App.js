import Login from "./login";
import Register from "./register"
import Home from "./Home/home"
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import {
    Route,
    Switch,
} from "react-router-dom"
import {useAuth} from "../authentication/AuthProvider";
import {connect, disconnect, subscribe} from "../websockets/WebsocketProvider";
import {useEffect} from "react";


function App() {
    const [logged] = useAuth();
     useEffect(()=>{
        if(logged){
            connect();
        } else {
            disconnect();
        }
     }, [logged])
    return (
        <div className="App">
            <Router>
                <Switch>
                        <Route exact path='/' component={Home}/>
                    {!logged && <>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/signup' component={Register}/>
                    </>}
                    <Redirect to={"/"}/>
                </Switch>
            </Router>
        </div>
    )
}


export default App;
