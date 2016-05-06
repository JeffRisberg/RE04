import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Donation from './Donation'
import { queryCompletedBasket } from '../actions/completedBasketItems';

/**
 * Render the confirmation screen
 *
 * @author Peter Cowan
 * @since April 2016
 */
class Confirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.queryCompletedBasket(this.props.params.orderId);
    }

    render() {
        if (this.props.donations != null && this.props.donations != undefined) {

            var donations = this.props.donations.map(function (donation, index) {
                return (
                    <Donation donation={donation} key={index}></Donation>
                );
            });

            return (
                <div className="content-region">
                    <div className="content-header">Order Confirmation</div>

                    <p>Thank you for your generous donations.</p>

                    <p>Your confirmation number is {this.props.orderId}</p>

                    <div style={{padding: '10px', border: '1px solid gray'}}>
                        {donations}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        orderId: ownProps.orderId,
        donations: state.completedBasketItems.donations
    };
};

export default connect(
    mapStateToProps,
    {queryCompletedBasket}
)(Confirmation);