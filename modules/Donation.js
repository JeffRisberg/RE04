import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';

class Donation extends React.Component {

    constructor () {
        super();
        this.state = {loading: true, charity: null};
    }

    loadCharityFromServer() {
        var charityId = this.props.donation.charityId;

        var url = "/api/charities/"+charityId;
        $.ajax({
            url: url,//this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({loading: false, charity: data.charity});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadCharityFromServer();
    }

    render() {
        if (this.state.loading == false) {
            return (
                <tr>
                    <td width="20%">{this.state.charity.name}</td>
                    <td>$ {this.props.donation.amount}</td>
                    <td>
                        {this.props.donation.shareEmail ? "Email" : "NoEmail"}&nbsp;
                        {this.props.donation.shareName ? "Name" : "NoName"}&nbsp;
                        {this.props.donation.shareAddress ? "Address" : "NoAddress"}
                    </td>
                    <td>
                        {this.props.donation.flatCharge}
                    </td>
                </tr>
            )
        }
        else {
            return (
                <tr></tr>
            );
        }
    }
}

export default Donation;