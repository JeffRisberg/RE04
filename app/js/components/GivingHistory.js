import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import SessionStore from '../store/SessionStore'
import GivingHistoryItem from './GivingHistoryItem'

/**
 * Fetches and renders a user's giving history
 */
class GivingHistory extends React.Component {
    constructor() {
        super();

        this.state = {givingHistoryItems: []};
    }

    componentDidMount() {
        this.props.onMount();
    }

    /*
    loadGivingHistoryFromServer() {
        if (SessionStore.isLoggedIn()) {
            var donorId = SessionStore.getDonorId();
            var token = SessionStore.getToken();

            var url = "/ws/donors/" + donorId + "/history?year=2016";

            $.ajax({
                url: url,
                beforeSend: function (request)
                {
                    request.setRequestHeader("auth-token", token);
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                this.setState({givingHistoryItems: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }
    */

    render() {
        if (SessionStore.isLoggedIn()) {
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
