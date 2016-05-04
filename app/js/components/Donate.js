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
        this.props.queryCharityByEin(this.props.params.ein);
    }

    render() {
        if (this.props.donor != null) {
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
        else {
            return (
                <div>
                    <p>Please log in first to make a donation</p>
                </div>
            )
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

            this.props.addToBasket(donation, charity.ein, "/basket");
        }
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor,
        currentCharities: state.currentCharities
    };
};
export default connect(
    mapStateToProps,
    {queryCharityByEin, addToBasket}
)(Donate);