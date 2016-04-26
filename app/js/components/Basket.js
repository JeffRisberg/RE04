import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { queryBasket } from '../actions/basketItems';

import SessionStore from '../store/SessionStore'
import Donation from './Donation'

/**
 * Shows the user's current basketContents
 */
class Basket extends React.Component {
    constructor() {
        super();

        this.state = {order: null};
        this.clearBasket = this.clearBasket.bind(this);
    }

    componentDidMount() {
        this.loadBasketFromServer();
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
                success: function (data) {
                    this.setState({order: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }
    */

    clearBasket() {
        if (SessionStore.isLoggedIn()) {
            $.ajax({
                url: "/ws/basket/clear",
                beforeSend: function (request) {
                    request.setRequestHeader("auth-token", SessionStore.getToken());
                },
                dataType: 'json',
                type: 'PUT',
                cache: false,
                success: function (data) {
                    var newOrderId = data.id;
                    SessionStore.setOrderId(newOrderId);
                    this.setState({order: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    render() {
        if (SessionStore.isLoggedIn() && this.state.order != null) {
            if (this.state.order.donations.length > 0) {
                var donations = this.state.order.donations.map(function (donation, index) {
                    return (
                        <Donation donation={donation} key={index}></Donation>
                    );
                });

                return (
                    <div>
                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            {donations}
                        </div>
                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            <Link to={"/Checkout/"} className="btn">
                                Proceed to Checkout
                            </Link>
                        </div>
                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            <button onClick={this.clearBasket}>Clear Basket</button>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <h4>Your basket is empty.</h4>
                );
            }
        }
        else {
            return (
                <div>
                    <p>Please log in first to view your Giving Basket</p>
                </div>
            )
        }
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
)(Basket);
