import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import DonationForm from './DonationForm'

import SessionStore from '../store/SessionStore'

class Donate extends React.Component {
    constructor() {
        super();
        this.state = {loading: true, charity: null};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //this.loadCharityFromServer();
    }

    /*
    loadCharityFromServer() {
        $.ajax({
            url: "/ws/charities/" + this.props.params.ein,
            beforeSend: function (request) {
                request.setRequestHeader("auth-token", SessionStore.getToken());
            },
            dataType: 'json',
            cache: false,
            success: function (response) {
                this.setState({loading: false, charity: response.data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    */

    render() {
        if (this.state.loading == false) {
            return (
                <DonationForm charity={this.state.charity} handleSubmit={this.handleSubmit} />
            );
        }
        else {
            return null;
        }
    }

    handleSubmit({formData}) {
        if (this.state.charity != null) {

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
        // to be filled in
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // to be filled in
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Donate);