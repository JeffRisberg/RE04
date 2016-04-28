import React from 'react'
import { Link } from 'react-router'
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';

import { login, logout } from '../actions/donor';

/**
 * The login component handles login and logout of a donor.
 *
 * A jsonSchema form is used for input.
 *
 * @author Jeff Risberg, Peter Cowan
 * @since March 2016
 */
class Login extends React.Component {

    constructor() {
        super();

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
        this.props.doLogout();
    }

    handleSubmit({formData}) {
        var loginValue = formData.login.trim();
        var password = formData.password.trim();

        this.props.doLogin(loginValue, password);
    }

    render() {
        if (this.props.donor != undefined && this.props.donor != null)
            return (
                <div>
                    <p>
                        You are logged in as {this.props.donor.firstName} {this.props.donor.lastName}
                    </p>
                    <button onClick={this.logout}>Logout</button>
                </div>
            );
        else
            return (
                <div style={{width: '500px'}}>
            <Form schema={this.schema}
                  uiSchema={this.uiSchema}
                  onSubmit={this.handleSubmit}>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </Form>
                    </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (loginValue, password) => {
            login(loginValue, password)(dispatch);
        },
        doLogout: () => {
            logout()(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
