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
        var amount = this.props.givingHistoryItem.amount;
        var flatCharge = this.props.givingHistoryItem.flatCharge;

        return (
            <div style={{marginBottom: '15px'}}>
                <input type="checkBox"/>&nbsp;
                <a href="">{charityName}</a>
                &nbsp;&nbsp;Amount - ${amount.toFixed(2)} View Details
                <br/>
                {moment(transDateTime).format("MM/DD/YYYY hh:mm:ss a")} (UTC)
                - Transaction Id #{transactionId}
            </div>
        );
    }
}

export default GivingHistoryItem;