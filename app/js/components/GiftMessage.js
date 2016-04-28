import React from 'react'

class GiftMessage extends React.Component {
    constructor() {
        super();
        this.state = { loading: true, donation: null, recipientName: '', memorialName: '', message: '', recipientEmail: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.composeGiftMessageJson = this.composeGiftMessageJson.bind(this)
    }

    componentDidMount() {
        this.loadDonationFromServer();
    }

    loadDonationFromServer() {
        var url = "/ws/basket/donations/" + this.props.params.donationId;
        $.ajax({
            url: url,
            beforeSend: function (request) {
                request.setRequestHeader("auth-token", this.props.donor.token);
            },
            dataType: 'json',
            cache: false,
            success: function (response) {
                console.log("loaded donation: " + JSON.stringify(response.data));
                var donation = response.data;
                var gift = donation.gift;
                this.setState({loading: false, donation: donation, recipientName: gift.recipientName, memorialName: gift.memorialName, message: gift.message, recipientEmail: gift.recipientEmail});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {

        if (this.state.loading == false) {
            return (
                <div>
                    <h3>Gift Options</h3>

                    <form onSubmit={this.handleSubmit}>
                        <p>
                            You are donating to: <br/> {this.state.donation.charity.name}
                        </p>

                        <p>Name of person to notify: <input type="text" name="recipientName"
                                                            value={this.state.recipientName}
                                                            onChange={this.handleChange}/></p>
                        {(this.state.donation.gift.memorialName)
                            ? <p>In memory of: <input type="text" name="memorialName"
                                                                  value={this.state.memorialName}
                                                                  onChange={this.handleChange}/></p>

                            : null}
                        <p>
                            <textarea name="giftMessage" onChange={this.handleChange}>{this.state.message}</textarea>
                        </p>

                        <p>Email address:
                            <input type="text" name="recipientEmail" value={this.state.recipientEmail} onChange={this.handleChange}/></p>

                        <input type="submit" value="Continue"/>
                    </form>
                </div>
            );
        }
        else {
            return null;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var donation = this.state.donation;
        if (donation != null) {

            $.ajax({
                url: '/ws/basket/donations/' + this.state.donation.id + '/gift/' + this.state.donation.gift.id,
                beforeSend: function (request) {
                    request.setRequestHeader("auth-token", this.props.donor.token);
                },
                type: 'PUT',
                contentType: "application/json",
                dataType: 'json',
                data: this.composeGiftMessageJson(),
                success: function (response) {
                    this.props.history.pushState(null, '/basket');
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    composeGiftMessageJson() {
        var giftMessage = Object.assign({}, this.state);
        delete giftMessage.loading;
        delete giftMessage.donation;

        var json = JSON.stringify(giftMessage);
        console.log("JSON: " + json);
        return json;
    }

    handleChange(e) {
        console.log("changing " + e.target.name + " to " + e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }
}

export default GiftMessage;