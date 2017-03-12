import React from 'react'

import Form from "react-jsonschema-form";

/**
 * Uses a forms package to create a donation screen
 *
 * @author various
 * @since April 2016
 */
class DonationForm extends React.Component {

    constructor() {
        super();

        this.schema = {
            "title": null,
            "type": "object",
            "required": [
                "amount"
            ],
            "properties": {
                "amount": {
                    "type": "integer",
                    "title": "Enter amount:"
                },
                "shareName": {
                    "type": "boolean",
                    "title": "Name"
                },
                "shareEmail": {
                    "type": "boolean",
                    "title": "Email"
                },
                "shareAddress": {
                    "type": "boolean",
                    "title": "Address"
                },
                "designation": {
                    "type": "string",
                    "title": "Program:"
                },
                "giftName": {
                    "type": "string",
                    "title": "In the name of:"
                },
                "memorialName": {
                    "type": "string",
                    "title": "In memory of:"
                }
            }
        };
    }

    render() {
        return (
            <div>
                <p>
                    You are donating to: {this.props.charity.name}
                </p>

                <p>
                    {this.props.charity.addressLine1}<br/>
                    {this.props.charity.city}, {this.props.charity.state} {this.props.charity.zip}<br/>
                    Description: {this.props.charity.description}</p>

                <div style={{width: '500px'}}>
                    <Form schema={this.schema}
                          onSubmit={this.props.handleSubmit}
                          formData={this.props.formData}>
                        <div>
                            <input type="submit" value="Donate"/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default DonationForm;