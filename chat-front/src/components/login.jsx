import React, {useState} from 'react'
import {login, useAuth} from "../authentication/AuthProvider";
import {Redirect} from "react-router-dom";

function Login() {
    const [creds, setCreds] = useState({login: "", password: ""});
    console.log(creds)
    const encodeCredentials = () => {
        let body = []
        let credDict = {
            login: creds.login,
            password: creds.password
        }
        for (let prop in credDict) {
            let key = encodeURIComponent(prop);
            let value = encodeURIComponent(creds[prop])
            body.push(key + "=" + value);
        }
        return body.join('&');
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const log_endpoint = 'http://localhost:8075/login';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            body: encodeCredentials().toString()
        };
        fetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    login(data)
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    return (
        <div>
            {useAuth() && <Redirect to={'/'}/>}
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Log in</h2>
                    <a href="/signup">Sign up</a>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" id="login"
                               onChange={e => setCreds({...creds, login: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password"
                               onChange={e => setCreds({...creds, password: e.target.value})}/>
                    </div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
        </div>
    )

}

export default Login;