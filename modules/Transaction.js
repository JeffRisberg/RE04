import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';

import Donation from './Donation'

class Transaction extends React.Component {

    constructor() {
        super();

        this.state = { loading: true, donations: null};
    }

    loadDonationsFromServer() {
        var transactionId = this.props.transaction.id;

        var url = "/api/transactions/"+transactionId+"/donations";
        $.ajax({
            url: url,//this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({donations: data.donations});
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
        var transDateStr = this.props.transaction.transactionDate;
        //var transDate = parseInt(transDateStr);

        if (this.state.donations != null && this.state.donations.length > 0) {
            var donationNodes = this.state.donations.map(function (donation, index) {
                return (
                    <Donation donation={donation} key={index}></Donation>
                );
            });
            return (
                <tr>
                    <td colSpan="99">
                        <table className="table" style={{width: "100%"}}>
                            <thead>
                            </thead>
                            <tbody>
                            {donationNodes}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        }
        else {
            return null;
        }
    }
}

export default Transaction;