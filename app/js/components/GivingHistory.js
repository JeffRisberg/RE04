import React from 'react'
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import { queryGivingHistory } from '../actions/givingHistoryItems';

import GivingHistoryItem from './GivingHistoryItem'

/**
 * Fetches and renders a donor's giving history
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class GivingHistory extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    };

    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.donor != undefined && this.props.donor != null) {
            this.props.queryGivingHistory(this.props.donor.token, this.props.donor);
        }
    }

    render() {
        const intl = this.props.intl;

        if (this.props.donor != undefined && this.props.donor != null) {
            const givingHistoryItems = this.props.givingHistoryItems;

            const givingHistoryItemNodes = givingHistoryItems.idList.map(function (itemId, index) {
                const givingHistoryItem = givingHistoryItems.records[itemId];

                return (
                    <GivingHistoryItem givingHistoryItem={givingHistoryItem} key={index}>
                    </GivingHistoryItem>
                );
            });

            return (
                <div className="content-region">
                    <div className="content-header">
                        {intl.formatMessage({id:'givingHistory|title'})}
                    </div>

                    <h2>
                        {intl.formatMessage({id:'givingHistory|subtitle'})}
                    </h2>

                    <div style={{marginBottom: '15px'}}>
                        <select>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                            <option selected>2017</option>
                        </select>
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th/>
                            <th>{intl.formatMessage({id:'givingHistory|columnLabelDate'})}</th>
                            <th>Transaction #</th>
                            <th>Charity</th>
                            <th className="text-right">Amount</th>
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
                    <div className="content-header">
                        Please log in first to view Giving History
                    </div>
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

export default injectIntl(connect(
    mapStateToProps,
    {queryGivingHistory}
)(GivingHistory));
