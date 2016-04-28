import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { queryTransactions } from '../actions/transactions';

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

        this.state = {givingHistoryItems: []};
    }

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        if (this.props.donor != null) {
            var givingHistoryItemNodes = this.state.givingHistoryItems.map(function (givingHistoryItem, index) {
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
        donor: state.donor
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            queryGivingHistory()(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GivingHistory);
