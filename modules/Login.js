import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import SessionStore from './SessionStore'

class Login extends React.Component {
    constructor() {
        super();

        this.state = {loggedIn: SessionStore.isLoggedIn()};
        this.logout = this.logout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    logout() {
        SessionStore.setLogin(null);
        SessionStore.setPassword(null);
        SessionStore.setDonorId(null);
        SessionStore.clearToken();

        this.setState({loggedIn: SessionStore.isLoggedIn()});
    }

    handleSubmit(e) {
        e.preventDefault();

        var login = ReactDOM.findDOMNode(this.refs.login).value.trim();
        var password = ReactDOM.findDOMNode(this.refs.login).value.trim();

        var credentials = {login: login, password: password};

        SessionStore.setLogin(login);
        SessionStore.setPassword(password);
        SessionStore.setDonorId(null);
        SessionStore.clearToken();

        var url = "api/donors/login";
        $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(credentials),
            success: function (data) {
                SessionStore.setToken(data.token);
                SessionStore.setDonorId(data.donorId);
                this.setState({loggedIn: SessionStore.isLoggedIn()});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        if (SessionStore.isLoggedIn())
            return (
                <div>
                    <p>You are logged in as {SessionStore.getLogin()}</p>
                    <button onClick={this.logout}>Logout</button>
                </div>
            )
        else
            return (
                <form onSubmit={this.handleSubmit}>
                    <p>Please Login:</p>
                    User name: <input type="text" ref="login"/>
                    <br/>
                    Password: <input type="text" ref="password"/>
                    <br/>
                    <input type="submit" value="Login"/>
                </form>
            )
    }
}

export default Login;