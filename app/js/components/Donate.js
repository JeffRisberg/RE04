import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import DonationForm from './DonationForm'

import { queryCharityByEin } from '../actions/currentCharities';
import { addToBasket } from '../actions/basketItems';

class Donate extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.onMount(this.props.params.ein);
    }

    render() {
        var charity = null;
        var id;
        if (this.props.currentCharities.records != undefined) {
            for (id in this.props.currentCharities.records) {
                var c = this.props.currentCharities.records[id];

                if (c != undefined && c.ein == this.props.params.ein) {
                    charity = c;
                }
            }
        }

        if (charity != null) {
            return (
                <DonationForm charity={charity} handleSubmit={this.handleSubmit}/>
            );
        }
        else {
            return null;
        }
    }

    handleSubmit({formData}) {
        var charity = null;
        var id;
        if (this.props.currentCharities.records != undefined) {
            for (id in this.props.currentCharities.records) {
                var c = this.props.currentCharities.records[id];

                if (c != undefined && c.ein == this.props.params.ein) {
                    charity = c;
                }
            }
        }

        if (charity != null) {

            var donation = formData;
            this.props.doAddToBasket(this.props.donor.token, donation, charity.ein, "/basket");

            /*
             $.ajax({
             url: '/ws/basket/donations/' + this.state.charity.ein,
             beforeSend: function (request) {
             request.setRequestHeader("auth-token", SessionStore.getToken());
             },
             type: 'POST',
             contentType: "application/json",
             dataType: 'json',
             data: JSON.stringify(formData),
             success: function (response) {
             console.log('giftName: ' + formData.giftName);
             console.log('formData: ' + JSON.stringify(formData));

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
             */
        }
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor,
        currentCharities: state.currentCharities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: (ein) => {
            queryCharityByEin(ein)(dispatch);
        },
        doAddToBasket: (token, donation, ein, thenUrl) => {
            addToBasket(token, donation, ein, thenUrl)(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Donate);