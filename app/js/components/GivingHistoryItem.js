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
        var transDateStr = this.props.givingHistoryItem.transactionDate;
        var transDate = parseInt(transDateStr);
        var charityName = this.props.givingHistoryItem.charityName;
        var amount = this.props.givingHistoryItem.amount;
        var flatCharge = this.props.givingHistoryItem.flatCharge;

        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{moment(transDate).format("MM/DD/YYYY")}</td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td>${amount.toFixed(0)}</td>
            </tr>
        );
    }
}

export default GivingHistoryItem;