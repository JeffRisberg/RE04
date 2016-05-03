import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Donation from './Donation'

/**
 * Render the confirmation screen
 *
 * @author Peter Cowan
 * @since April 2016
 */
class Confirmation extends React.Component {
    constructor() {
        super();

        this.state = {order: null};
    }

    componentDidMount() {
        this.props.getTransaction();
    }

    /*
    loadCompletedOrderFromServer() {
        let { orderId } = this.props.params;

        if (SessionStore.isLoggedIn()) {
            $.ajax({
                url: "/ws/donors/" + SessionStore.getDonorId() + "/history/" + orderId,
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

    render() {
        if (SessionStore.isLoggedIn() && this.state.order != null) {
            var donations = this.state.order.donations.map(function (donation, index) {
                return (
                    <Donation donation={donation} key={index}></Donation>
                );
            });

            return (
                <div>
                    <h3>Order Confirmation</h3>
                    <p>Thank you for your generous donations. </p>
                    <p>Your confirmation number is {this.state.order.id}</p>
                    <div style={{padding: '10px', border: '1px solid gray'}}>
                        {donations}
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(
    mapStateToProps
)(Confirmation);