import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { queryBasket, clearBasket } from '../actions/basketItems';

import Donation from './Donation'

/**
 * Shows the donor's current basket contents
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class Basket extends React.Component {
    constructor() {
        super();

        this.state = {order: null};
        this.clearBasket = this.clearBasket.bind(this);
    }

    componentDidMount() {
        if (this.props.donor != undefined && this.props.donor != null) {
            this.props.queryBasket(this.props.donor.token);
        }
    }

    clearBasket() {
        if (this.props.donor != undefined && this.props.donor != null) {
            this.props.clearBasket(this.props.donor.token);
        }
    }

    render() {
        if (this.props.donor != null) {
            if (this.props.basketItems != null && this.props.basketItems != undefined) {
                var donations = this.props.basketItems.donations;

                if (donations != undefined && donations.length > 0) {
                    var donationItems = donations.map(function (donation, index) {
                        return (
                            <Donation donation={donation} key={index}></Donation>
                        );
                    });

                    return (
                        <div>
                            <div style={{padding: '10px', border: '1px solid gray'}}>
                                {donationItems}
                            </div>
                            <div style={{padding: '10px', border: '1px solid gray'}}>
                                <Link to={"checkout/"} className="btn">
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
                // fetch still pending
                return null;
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
        donor: state.donor,
        basketItems: state.basketItems
    };
};

export default connect(
    mapStateToProps,
    {queryBasket, clearBasket}
)(Basket);
