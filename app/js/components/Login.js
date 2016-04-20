import React from 'react'
import { Link } from 'react-router'
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';

import SessionStore from '../store/SessionStore'

import { login, logout } from '../actions';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {loggedIn: SessionStore.isLoggedIn()};
        this.logout = this.logout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.schema = {
            "title": null,
            "type": "object",
            "required": [
                "login","password"
            ],
            "properties": {
                "login": {
                    "type": "string",
                    "title": "Username:"
                },
                "password": {
                    "type": "string",
                    "title": "Password:"
                }
            }
        };

        this.uiSchema = {
            "password": {
                "ui:widget": "password"
            }
        };
    }

    logout() {
        var token = SessionStore.getToken();

        this.props.dispatch(logout);

        //var url = "/ws/donors/logout";
        //$.ajax({
        //    url: url,
        //    type: 'PUT',
        //    beforeSend: function (request) {
        //        request.setRequestHeader("auth-token", token);
        //    },
        //    contentType: "application/json",
        //    dataType: 'json',
        //    success: function (response) {
        //    }.bind(this),
        //    error: function (xhr, status, err) {
        //        console.error(this.props.url, status, err.toString());
        //    }.bind(this)
        //});

        SessionStore.setLogin(null);
        SessionStore.setPassword(null);
        SessionStore.setDonorId(null);
        SessionStore.setOrderId(null);
        SessionStore.clearToken();

        this.setState({loggedIn: SessionStore.isLoggedIn()});
    }

    handleSubmit({formData}) {
        var loginValue = formData.login.trim();
        var password = formData.password.trim();

        SessionStore.setLogin(login);
        SessionStore.setPassword(password);
        SessionStore.setDonorId(null);
        SessionStore.setOrderId(null);
        SessionStore.clearToken();

        this.props.dispatch(login(loginValue, password));

        //var url = "/ws/donors/login";
        //$.ajax({
        //    url: url,
        //    type: 'POST',
        //    contentType: "application/json",
        //    dataType: 'json',
        //    data: JSON.stringify(formData),
        //    success: function (data) {
        //        SessionStore.setToken(data.token);
        //        SessionStore.setDonorId(data.donorId);
        //        SessionStore.setOrderId(data.orderId);
        //        this.setState({loggedIn: SessionStore.isLoggedIn()});
        //    }.bind(this),
        //    error: function (xhr, status, err) {
        //        console.error(this.props.url, status, err.toString());
        //    }.bind(this)
        //});
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
            <Form schema={this.schema}
                  uiSchema={this.uiSchema}
                  onSubmit={this.handleSubmit}>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </Form>
            )
    }
}

export default connect()(Login);
