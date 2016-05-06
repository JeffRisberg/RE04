import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux';
import Form from "react-jsonschema-form";

import { queryBasket, checkout } from '../actions/basketItems';

/**
 * Fetches Basket contents and renders a checkout screen
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class Checkout extends React.Component {
    constructor() {
        super();

        this.schema = {
            "title": null,
            "type": "object",
            "required": [
                "cardType","cardNumber","cscCode","expMonth","expYear"
            ],
            "properties": {
                "cardNumber": {
                    "type": "string",
                    "title": "Card Number:"
                },
                "cscCode": {
                    "type": "string",
                    "title": "Cv Code:"
                },
                "expMonth": {
                    "type": "integer",
                    "title": "Expiration Month:"
                },
                "expYear": {
                    "type": "integer",
                    "title": "Expiration Year:"
                }

            }
        };

        this.uiSchema = {
            "cardType": {
                "ui:widget": "hidden"
            }
        }
    }

    componentDidMount() {
        if (this.props.donor != undefined && this.props.donor != null) {
            this.props.queryBasket();
        }
    }

    render() {
        return (
            <div className="content-region">
                <Form schema={this.schema}
                      uiSchema={this.uiSchema}
                      onSubmit={this.props.checkout}
                      formData={{cardType: 1}}>
                    <div>
                        <input type="submit" value="Checkout"/>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor,
        basketItems: state.basketItems
    };
};
export default connect(
    mapStateToProps,
    {queryBasket, checkout}
)(Checkout);