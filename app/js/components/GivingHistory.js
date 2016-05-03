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
            console.log('donor: ' + JSON.stringify(this.props.donor));
            this.props.queryGivingHistory(this.props.donor.token, this.props.donor);
        }
    }

    render() {
        if (this.props.donor != undefined && this.props.donor != null) {
            const givingHistoryItems = this.props.givingHistoryItems;
            var givingHistoryItemNodes = givingHistoryItems.idList.map(function (itemId, index) {
                let givingHistoryItem = givingHistoryItems.records[itemId];
                return (
                    <GivingHistoryItem givingHistoryItem={givingHistoryItem} key={index}>
                    </GivingHistoryItem>
                );
            });

            return (
                <div style={{padding: '10px', border: '1px solid gray'}}>
                    {givingHistoryItemNodes}
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Please log in first to view Giving History</p>
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
