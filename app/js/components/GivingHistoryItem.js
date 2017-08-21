import React from 'react';
import { FormattedNumber, FormattedDate } from 'react-intl';

/**
 * Renders one givingHistoryItem
 */
class GivingHistoryItem extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { transactionId, charityName, amount, currency } = this.props.givingHistoryItem;

        const transDateStr = this.props.givingHistoryItem.transactionDate;
        const transDate = parseInt(transDateStr);

        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>
                    <FormattedDate value={transDate}/>
                </td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td className="text-right">
                    <FormattedNumber
                        value={amount}
                        style="currency"
                        currency={currency}/>
                </td>
            </tr>
        );
    }
}

export default GivingHistoryItem;