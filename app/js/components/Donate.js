import React from "react";
import {connect} from "react-redux";
import DonationForm from "./DonationForm";
import {addToBasket} from "../actions/basketItems";

/**
 * Donation entry screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since March 2016
 */
class Donate extends React.Component {

    componentDidMount() {
        // We assume that the charity is in the topCharities list or the currentCharities list
    }

    render() {
        if (this.props.donor != null) {
            const charity = this.locateCharity(this.props.params.ein);

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

    handleSubmit = ({formData}) => {
        const charity = this.locateCharity(this.props.params.ein);

        if (charity != null) {
            const donation = formData;

            this.props.addToBasket(donation, charity.ein, "/basket");
        }
    }

    locateCharity = (ein) => {
        let id;
        if (this.props.currentCharities.records != undefined) {
            for (id in this.props.currentCharities.records) {
                const c = this.props.currentCharities.records[id];

                if (c != undefined && c.ein == ein) {
                    return c;
                }
            }
        }
        if (this.props.topCharities.records != undefined) {
            for (id in this.props.topCharities.records) {
                const topListCharity = this.props.topCharities.records[id];
                const c = topListCharity.charity;

                if (c != undefined && c.ein == ein) {
                    return c;
                }
            }
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor,
        currentCharities: state.currentCharities,
        topCharities: state.topCharities
    };
};
export default connect(
    mapStateToProps,
    {addToBasket}
)(Donate);