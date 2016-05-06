import React from 'react'
import { Link } from 'react-router'

import moment from 'moment';

/**
 * Renders one givingHistoryItem
 */
class GivingHistoryItem extends React.Component {

    constructor() {
        super();
    }

    render() {
        var transactionId = this.props.givingHistoryItem.transactionId;
        var transDateTimeStr = this.props.givingHistoryItem.transactionDateTime;
        var transDateTime = parseInt(transDateTimeStr);
        var charityName = this.props.givingHistoryItem.charityName;
        var points = this.props.givingHistoryItem.amount;
        var amount = points / 10;
        var flatCharge = this.props.givingHistoryItem.flatCharge;

        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{moment(transDateTime).format("MM/DD/YYYY")}</td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td>{points.toFixed(0)} Points (${amount.toFixed(2)} to the charity)</td>
            </tr>
        );
    }
}

export default GivingHistoryItem;