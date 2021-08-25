import React, {useState} from 'react'
import {Redirect} from "react-router-dom";

function Register() {
    const [form, setForm] = useState({login: "", password: "", name: ""})
    const [error, setError] = useState({login: null, password: null, name: null});
    const [redirect, setRedirect] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        setError({login: null, password: null, name: null})
        if (form.login.length < 2 || form.password.length < 6 || form.name.length < 1) {
            let errors = {}
            if (form.login.length < 2) {
                errors["login"] = "Login must be at least 2 characters!"
            }
            if (form.password.length < 6) {
                errors["password"] = "Password must be at least 6 character."
            }
            if (form.name.length < 1) {
                errors["name"] = "Name must exist."
            }
            setError(errors)
            return;
        }
        const log_endpoint = 'http://localhost:8075/register';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        };
        fetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setRedirect(true);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }
    return (

        <form className={"auth-form"} onSubmit={submitHandler}>
            {redirect && <Redirect to={"/"}/>}
            <div className="form-inner">
                <h2>Sign up</h2>
                <a href="/login">Sign in</a>
                {error.login && <h4 className={"errorMessage"}>{error.login}</h4>}
                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input type="text" name="login" id="login"
                           onChange={e => setForm({...form, login: e.target.value})}/>
                </div>
                {error.password && <h4 className={"errorMessage"}>{error.password}</h4>}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password"
                           onChange={e => setForm({...form, password: e.target.value})}/>
                </div>
                {error.name && <h4 className={"errorMessage"}>{error.name}</h4>}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name"
                           onChange={e => setForm({...form, name: e.target.value})}/>
                </div>
                <input type="submit" value="Sign up"/>
            </div>
        </form>
    )

}

export default Register;