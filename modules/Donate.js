import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import moment from 'moment';

class Donate extends React.Component {
    constructor() {
        super();
        this.state = {loading: true, charity: null, transaction: null, donation: null};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadCharityFromServer() {
        let { charityId } = this.props.params;

        var url = "api/charities";
        $.ajax({
            url: url + "/" + charityId,
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

    handleSubmit(e) {
        e.preventDefault();
        var charity = this.state.charity;
        if (charity != null) {
            var charityName = charity.name;

            var amountStr = ReactDOM.findDOMNode(this.refs.amount).value.trim();
            var amount = parseInt(amountStr);
            var datetimeStr = ReactDOM.findDOMNode(this.refs.datetime).value.trim();
            var datetime = parseInt(datetimeStr);

            var transaction = {donorId: 1, transactionDate: datetime};
            var donation = {charityId: charityId, amount: amount, flatChard: 0.35};

            $.ajax({
                url: '/api/transactions',
                contentType: "application/json",
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify({transaction: transaction}),
                success: function (data) {
                    console.log(data.transaction);
                    var transactionId = data.transaction.id;
                    donation.transactionId = transactionId;
                    $.ajax({
                        url: '/api/donations',
                        contentType: "application/json",
                        dataType: 'json',
                        type: 'POST',
                        data: JSON.stringify({donation: donation}),
                        success: function (data) {
                            this.setState({loading: false, transaction: transaction});
                        }.bind(this),
                        error: function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    render() {
        let { charityId } = this.props.params;

        if (this.state.loading == false) {
            if (this.state.transaction == null)
                return (
                    <form onSubmit={this.handleSubmit}>
                        You are donating to: {this.state.charity.name}
                        <br/>
                        {this.state.charity.addressLine1}<br/>
                        {this.state.charity.city}, {this.state.charity.state} {this.state.charity.zip}<br/>
                        Description: {this.state.charity.description}<br/>
                        Enter amount:
                        <input type="text" ref="amount"/>
                        <input type="hidden" ref="datetime" value={moment()}/>
                        <input type="submit" value="Donate"/>
                    </form>
                );
            else if (this.state.transaction != null) {
                return (
                    <div>Thank you!</div>
                )
            }
        }
        else {
            return null;
        }
    }
}

export default Donate;