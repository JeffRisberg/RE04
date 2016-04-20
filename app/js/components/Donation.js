import React from 'react'
import { Link } from 'react-router'

class Donation extends React.Component {

    constructor() {
        super();
    }

    render() {
        var charityName = this.props.donation.charity.name;
        var amount = this.props.donation.amount;
        var recipientName = (this.props.donation.gift == null) ? null : this.props.donation.gift.recipientName;

        return (
            <div style={{marginBottom: '15px'}}>
                <a href="">{charityName}</a>
                &nbsp;&nbsp;Amount - ${amount.toFixed(2)}
                <br/>
                Program: {this.props.donation.designation}
                <br/>
                Share Name: {this.props.donation.shareName}, Share Email: {this.props.donation.shareEmail}, Share Address: {this.props.donation.shareAddress}
                <br/>
                Gift Name: { recipientName}
                <hr/>
            </div>
        );
    }
}

export default Donation;