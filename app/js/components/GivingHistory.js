import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { queryGivingHistory } from '../actions/givingHistoryItems';

import GivingHistoryItem from './GivingHistoryItem'

/**
 * Fetches and renders a user's giving history
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class GivingHistory extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.donor != undefined && this.props.donor != null) {
            this.props.queryGivingHistory(this.props.donor.token, this.props.donor);
        }
    }

    render() {
        if (this.props.donor != undefined && this.props.donor != null) {
            const givingHistoryItems = this.props.givingHistoryItems;

            var givingHistoryItemNodes = givingHistoryItems.idList.map(function (itemId, index) {
                const givingHistoryItem = givingHistoryItems.records[itemId];

                return (
                    <GivingHistoryItem givingHistoryItem={givingHistoryItem} key={index}>
                    </GivingHistoryItem>
                );
            });

            return (
                <div className="content-region">
                    <div className="content-header">Giving History</div>

                    <p>Below is a history of your past donations with Wells Fargo Go Far Rewards.</p>

                    <p>To donate again to a charity select it below.</p>

                    <p>TIP: for a detailed history of your donations for your tax records,
                        go to Account Activity.
                    </p>

                    <div style={{marginBottom: '15px'}}>
                        <select>
                            <option>2014</option>
                            <option>2015</option>
                            <option selected>2016</option>
                        </select>
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Transaction #</th>
                            <th>Charity</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {givingHistoryItemNodes}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div className="content-region">
                    <div className="content-header">Please log in first to view Giving History</div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor,
        givingHistoryItems: state.givingHistoryItems
    };
};

export default connect(
    mapStateToProps,
    {queryGivingHistory}
)(GivingHistory);
