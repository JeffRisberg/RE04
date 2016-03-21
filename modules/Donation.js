import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';

class Donation extends React.Component {

    render() {
        var transDateStr = this.props.donation.transactionDate;
        var transDate = parseInt(transDateStr);
        return (
            <tr>
                <td>{this.props.donation.charityName}</td>
                <td>$ {this.props.donation.amount}</td>
                <td>{moment(transDate).format("MM/DD/YYYY hh:mm:ss a")}</td>
            </tr>
        )
    }
}

export default Donation;