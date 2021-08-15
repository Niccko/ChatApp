import React, {Component} from 'react'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            name: ""
        }
    }

    render() {
        const submitHandler = e => {
            e.preventDefault();
            const log_endpoint = 'http://localhost:8075/register';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            };
            fetch(log_endpoint, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        this.props.history.push('/login');
                    }
                })
                .catch(error => {
                    this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });

        }
        return (

            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Sign up</h2>
                    <a href="/login">Sign in</a>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" id="login"
                               onChange={e => this.setState({login: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password"
                               onChange={e => this.setState({password: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name"
                               onChange={e => this.setState({name: e.target.value})}/>
                    </div>
                    <input type="submit" value="Sign up"/>
                </div>
            </form>
        )
    }
}

export default Register;