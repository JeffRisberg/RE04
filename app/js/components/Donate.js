import React from 'react'
import SessionStore from '../../../store/SessionStore'

class Donate extends React.Component {
    constructor() {
        super();
        this.state = {loading: true, charity: null, amount: null,
                    shareName: true, shareEmail: true, shareAddress: true,
                    designation: null, giftName: null, memorialName: null};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.composeDonationJson = this.composeDonationJson.bind(this)
    }

    componentDidMount() {
        this.loadCharityFromServer();
    }

    loadCharityFromServer() {
        var token = SessionStore.getToken();

        var url = "/ws/charities";
        $.ajax({
            url: url + "/" + this.props.params.ein,
            beforeSend: function (request) {
                request.setRequestHeader("auth-token", token);
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({loading: false, charity: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {

        if (this.state.loading == false) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <p>
                    You are donating to: {this.state.charity.name}
                    </p>
                    <p>
                    {this.state.charity.addressLine1}<br/>
                    {this.state.charity.city}, {this.state.charity.state} {this.state.charity.zip}<br/>
                    Description: {this.state.charity.description}</p>
                    <p>Enter amount: <input type="text" name="amount" onChange={this.handleChange}/></p>
                    <p>
                        <input type="checkbox" name="shareName" checked={this.state.shareName} onChange={this.handleCheck}/> Name&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox" name="shareEmail" checked={this.state.shareEmail} onChange={this.handleCheck}/> Email&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox" name="shareAddress" checked={this.state.shareAddress} onChange={this.handleCheck}/> Mailing Address&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>Program: <input type="text" name="designation" onChange={this.handleChange}/></p>
                    <p>In the name of: <input type="text" name="giftName" onChange={this.handleChange}/></p>
                    <p>In memory of: <input type="text" name="memorialName" onChange={this.handleChange}/></p>

                    <input type="submit" value="Donate"/>
                </form>
            );
        }
        else {
            return null;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var charity = this.state.charity;
        if (charity != null) {

            $.ajax({
                url: '/ws/basket/donations/' + charity.ein,
                beforeSend: function (request) {
                    request.setRequestHeader("auth-token", SessionStore.getToken());
                },
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data: this.composeDonationJson(),
                success: function (data) {
                    this.props.history.pushState(null, '/basket');
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    composeDonationJson() {
        var donation = Object.assign({}, this.state);
        delete donation.loading;
        delete donation.charity;

        var json = JSON.stringify(donation);
        console.log("JSON: " + json);
        return json;
    }

    handleChange(e) {
        console.log("changing " + e.target.name + " to " + e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    handleCheck(e) {
        console.log(e.target.name + " current value: " + this.state[e.target.name]);
        console.log("changing " + e.target.name + " to " + e.target.checked);
        this.setState({[e.target.name]: e.target.checked});
    }
}

export default Donate;