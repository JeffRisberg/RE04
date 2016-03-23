import React from 'react'
import { Link } from 'react-router'

import Transaction from './Transaction'

class GivingHistory extends React.Component {
    constructor() {
        super();

        this.state = {transactions: []};
    }

    loadTransactionsFromServer() {
        //var url = "/ws/orders/history/99999";
        var url = "api/transactions";
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({transactions: data.transactions});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadTransactionsFromServer();
    }

    render() {
        var transactionNodes = this.state.transactions.map(function (transaction, index) {
            return (
                <Transaction transaction={transaction} key={index}></Transaction>
            );
        });

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Charity</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Flags</th>
                    <th>Flat Charge</th>
                </tr>
                </thead>
                <tbody>
                {transactionNodes}
                </tbody>
            </table>
        );
    }
}

export default GivingHistory;