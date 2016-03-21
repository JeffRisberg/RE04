import React from 'react'
import { Link } from 'react-router'

import Donation from './Donation'

class GivingHistory extends React.Component {
    constructor() {
        super();

        this.state = {donations: []};
    }

    loadDonationsFromServer() {
        var url = "api/donations";
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
        var donationNodes = this.state.donations.map(function (donation, index) {
            return (
                <Donation donation={donation} key={index}></Donation>
            );
        });

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Charity</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {donationNodes}
                </tbody>
            </table>
        );
    }
}

export default GivingHistory;