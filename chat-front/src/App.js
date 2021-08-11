import React, {Component} from "react";
import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import Home from "./components/Home/home"
import {BrowserRouter as Router} from 'react-router-dom'
import {
    Route,
    Switch,
} from "react-router-dom"



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.updateAuth = this.updateAuth.bind(this);
    }

    updateAuth(e) {
        console.log(e);
        this.setState({user: e})
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' render = {()=><Home user={this.props.user}/>}/>
                        <Route path='/login' render = {()=><Login authHandler={this.updateAuth}/>}/>
                        <Route path='/signup' component={Register}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
