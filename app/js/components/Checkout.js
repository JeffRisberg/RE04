import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { queryBasket } from '../actions/basketItems';

/**
 * Fetches Basket contents and renders a checkout screen
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {loading: true, order: null};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.onMount();
    }

    getInitialState() {
        return {
            loading: true,
            order: null
        };
    }

    /*
    loadBasketFromServer() {
        if (SessionStore.isLoggedIn()) {
            $.ajax({
                url: "/ws/basket/",
                beforeSend: function (request) {
                    request.setRequestHeader("auth-token", SessionStore.getToken());
                },
                dataType: 'json',
                cache: false,
                success: function (response) {
                    this.setState({order: response.data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }
    */

    handleSubmit(e) {
        e.preventDefault();
        var cardType = ReactDOM.findDOMNode(this.refs.cardType).value.trim();
        var creditCardNumber = ReactDOM.findDOMNode(this.refs.cardNumber).value.trim();
        var cvCode = ReactDOM.findDOMNode(this.refs.cscCode).value.trim();
        var expMonth = ReactDOM.findDOMNode(this.refs.expMonth).value.trim();
        var expYear = ReactDOM.findDOMNode(this.refs.expYear).value.trim();

        var creditCard = {
            cardType: cardType,
            cardNumber: creditCardNumber,
            cscCode: cvCode,
            expMonth: expMonth,
            expYear: expYear
        };

        /*
        var orderId = SessionStore.getOrderId();

        $.ajax({
            url: '/ws/basket/checkout',
            beforeSend: function (request) {
                request.setRequestHeader("auth-token", SessionStore.getToken());
            },
            type: 'PUT',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(creditCard),
            success: function (data) {
                this.props.history.pushState(null, '/confirmation/' + orderId);
                var newOrderId = data.id;
                SessionStore.setOrderId(newOrderId);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        */
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" ref="cardType" value="Visa"/>
                    CardNumber: <input type="text" ref="cardNumber"/><br/>
                    CV Code: <input type="text" ref="cscCode"/><br/>
                    Exp Month: <input type="text" ref="expMonth"/><br/>
                    Exp Year: <input type="text" ref="expYear"/><br/>
                    <input type="submit" value="Checkout"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            queryBasket()(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);