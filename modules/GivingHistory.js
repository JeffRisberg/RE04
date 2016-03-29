import React from 'react'
import { Link } from 'react-router'

import Transaction from './Transaction'
import SessionStore from './SessionStore'

class GivingHistory extends React.Component {
    constructor() {
        super();

        this.state = {transactions: []};
    }

    loadTransactionsFromServer() {
        if (SessionStore.isLoggedIn()) {
            var donorId = SessionStore.getDonorId();

            var url = "api/transactions?donorId=" + donorId;

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
    }

    componentDidMount() {
        this.loadTransactionsFromServer();
    }

    render() {
        if (SessionStore.isLoggedIn()) {
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
        else {
            return (
                <div>
                    <p>Please log in first to view Giving History</p>
                </div>
            )
        }
    }
}

export default GivingHistory;