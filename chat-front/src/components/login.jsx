import React, {Component} from 'react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            login: "",
            password: ""
        }

    }

    submitHandler(e) {
        e.preventDefault();
        const log_endpoint = 'http://localhost:8075/api/v1/auth/login';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state),
        };
        fetch(log_endpoint, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;

                    return Promise.reject(error);
                } else {
                    this.props.authHandler(data.user)
                    localStorage.setItem('jwt', data.token);
                }

            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
            });

    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-inner">
                    <h2>Log in</h2>
                    <a href="/signup">Sign up</a>
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
                    <input type="submit" value="Login"/>
                </div>
            </form>
        )
    }
}

export default Login;