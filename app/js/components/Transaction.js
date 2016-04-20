import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';

import Donation from './Donation'

class Transaction extends React.Component {

    constructor() {
        super();

        this.state = {loading: true, donations: []};
    }

    loadDonationsFromServer() {
        var transactionId = this.props.transaction.id;

        var url = "/ws/transactions/" + transactionId + "/donations";
        $.ajax({
            url: url,//this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({loading: false, donations: data.donations});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadDonationsFromServer();
    }

    render() {
        var transactionId = this.props.transaction.id;
        var transDateStr = this.props.transaction.transactionDate;
        var transDate = parseInt(transDateStr);

        if (this.state.donations.length > 0) {
            var donationNodes = this.state.donations.map(function (donation, index) {
                return (
                    <Donation donation={donation} key={index}></Donation>
                );
            });
            return (
                <tr>
                    <td colSpan="99">
                        Transaction {transactionId}, created on {moment(transDate).format("MM/DD/YYYY hh:mm:ss")}
                        <br/>
                        <table className="table" style={{width: "100%"}}>
                            <tbody>
                            {donationNodes}
                            </tbody>
                        </table>
                    </td>
                </tr>
            );
        }
        else {
            return (
                <tr>
                    <td colSpan="99">
                        Transaction {transactionId}, created on {transDateStr}
                        <br/>
                        No donations
                    </td>
                </tr>
            );
        }
    }
}

export default Transaction;