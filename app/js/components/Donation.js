import React from 'react'

/**
 * Renders one donation.  Used on the Basket screen and the Confirmation screen.
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since March 2016
 */
class Donation extends React.Component {

    render() {
        const charityName = this.props.donation.charity.name;
        const amount = this.props.donation.amount;
        const recipientName = (this.props.donation.gift == null) ? null : this.props.donation.gift.recipientName;

        return (
            <div style={{marginBottom: '15px'}}>
                <a href="">{charityName}</a>
                &nbsp;&nbsp;Amount - ${amount.toFixed(2)}
                <br/>
                Program: {this.props.donation.designation}
                <br/>
                Share Name: {this.props.donation.shareName}, Share Email: {this.props.donation.shareEmail}, Share
                Address: {this.props.donation.shareAddress}
                <br/>
                Gift Name: { recipientName}
                <hr/>
            </div>
        );
    }
}

export default Donation;
