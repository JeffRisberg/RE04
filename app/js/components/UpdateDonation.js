import React from 'react'

import DonationForm from './DonationForm'

class UpdateDonation extends React.Component {
    constructor() {
        super();

        this.state = {loading: true, donation: null, formData: {}};
    }

    componentDidMount() {
        this.loadDonationFromServer();
    }

    loadDonationFromServer() {
        $.ajax({
            url: "/ws/basket/donations/" + this.props.params.donationId,
            beforeSend: function (request) {
                request.setRequestHeader("auth-token", this.props.donor.token);
            },
            dataType: 'json',
            cache: false,
            success: function (response) {
                var donation = response.data;
                var formData = {amount: donation.amount, shareName: donation.shareName, shareEmail: donation.shareEmail,
                    shareAddress: donation.shareAddress, designation: donation.designation};
                if (donation.gift != null) {
                    if (donation.gift.memorialName) {
                        Object.assign(formData, {memorialName: donation.gift.memorialName})
                    } else {
                        Object.assign(formData, {giftName: donation.gift.recipientName})
                    }
                }
                this.setState({loading: false, donation: donation, formData: formData});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        if (this.state.loading == false) {
            return (
                <DonationForm charity={this.state.donation.charity} handleSubmit={this.handleSubmit} formData={this.state.formData}/>
            );
        }
        else {
            return null;
        }
    }

    handleSubmit = ({formData}) => {
        if (this.state.donation.charity != null) {

            $.ajax({
                url: '/ws/basket/donations/' + this.state.donation.id,
                beforeSend: function (request) {
                    request.setRequestHeader("auth-token", this.props.donor.token);
                },
                type: 'PUT',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(formData),
                success: function (response) {
                    console.log('giftName: ' + this.state.giftName);
                    if (formData.giftName || formData.memorialName) {
                        console.log('Added donation: ' + response.data.id);
                        this.props.history.pushState(null, '/giftMessage/' + response.data.id);
                    } else {
                        this.props.history.pushState(null, '/basket');
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }
}

export default UpdateDonation;