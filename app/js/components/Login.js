import React from 'react'
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';

import { login, logout } from '../actions/donor';

/**
 * The login component handles login and logout of a donor.
 *
 * A jsonSchema form is used for input.
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since March 2016
 */
class Login extends React.Component {

    constructor() {
        super();

        this.schema = {
            "title": null,
            "type": "object",
            "required": [
                "login", "password"
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

    handleSubmit = ({formData}) => {
        const loginValue = formData.login.trim();
        const password = formData.password.trim();

        this.props.login(loginValue, password);
    }

    render() {
        if (this.props.donor != undefined && this.props.donor != null)
            return (
                <div>
                    <p>
                        You are logged in as {this.props.donor.firstName} {this.props.donor.lastName}
                    </p>
                    <button onClick={() => {this.props.logout(this.props.donor.token)}}>Logout</button>
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

export default connect(
    mapStateToProps,
    {login, logout}
)(Login);
