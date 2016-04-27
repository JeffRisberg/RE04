import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import DonationForm from './DonationForm'

import { queryCharity } from '../actions/currentCharities';

import SessionStore from '../store/SessionStore'

class Donate extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.onMount(this.props.ein);
    }

    render() {
        var charity = null;
        for (id in this.props.currentCharities.records) {
            var thisCharity = this.props.currentCharities.records[id];
            if (thisCharity != undefined && thisCharity.ein == this.props.ein)
                charity = thisCharity;
        }

        if (charity != null) {
            return (
                <DonationForm charity={this.state.charity} handleSubmit={this.handleSubmit}/>
            );
        }
        else {
            return null;
        }
    }

    handleSubmit({formData}) {
        var charity = null;
        if (charity != null) {

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
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentCharities: state.currentCharities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: (ein) => {
            queryCharity(ein)(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Donate);