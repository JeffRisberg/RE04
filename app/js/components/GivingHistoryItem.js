import React from 'react'
import {FormattedNumber} from 'react-intl';

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

        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{moment(transDate).format("MM/DD/YYYY")}</td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td className="text-right">
                    <FormattedNumber
                        value={amount}
                        style="currency"
                        currency="USD"/>
                    </td>
            </tr>
        );
    }
}

export default GivingHistoryItem;