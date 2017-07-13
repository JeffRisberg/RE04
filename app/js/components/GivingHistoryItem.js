import React from 'react'

import moment from 'moment';

/**
 * Renders one givingHistoryItem
 */
class GivingHistoryItem extends React.Component {

    constructor() {
        super();
    }

    render() {
        const transactionId = this.props.givingHistoryItem.transactionId;
        const transDateStr = this.props.givingHistoryItem.transactionDate;
        const transDate = parseInt(transDateStr);
        const charityName = this.props.givingHistoryItem.charityName;
        const amount = this.props.givingHistoryItem.amount;
        const amountStr = amount.toLocaleString(undefined, { minimumFractionDigits: 2 });

        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{moment(transDate).format("MM/DD/YYYY")}</td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td className="text-right">${amountStr}</td>
            </tr>
        );
    }
}

export default GivingHistoryItem;