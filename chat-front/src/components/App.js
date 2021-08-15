
import Login from "./login";
import Register from "./register"
import Home from "./Home/home"
import {BrowserRouter as Router} from 'react-router-dom'
import {
    Route,
    Switch,
} from "react-router-dom"
import {useAuth} from "../authentication/AuthProvider";


function App() {
    const [logged] = useAuth();

    return (
        <div className="App">
            <Router>
                <Switch>

                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/signup' component={Register}/>
                    {logged && <>
                        <Route exact path='/' render={() => <Home/>}/>
                    </>}
                </Switch>
            </Router>
        </div>
    )
}


export default App;
