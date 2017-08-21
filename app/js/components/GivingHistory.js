import React from 'react'
import { PropTypes } from 'prop-types';
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
        donor: PropTypes.object.isRequired,
        givingHistoryItems: PropTypes.object.isRequired,
        queryGivingHistory: PropTypes.object.isRequired
    };

    constructor() {
        super();
    }

    componentDidMount() {
        const { donor, queryGivingHistory } = this.props;

        if (donor != undefined && donor != null) {
            queryGivingHistory(donor.token, donor);
        }
    }

    render() {
        const { intl, donor, givingHistoryItems } = this.props;

        if (donor != undefined && donor != null) {
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
                            <th>{intl.formatMessage({id:'givingHistory|columnLabelTransaction'})}</th>
                            <th>{intl.formatMessage({id:'givingHistory|columnLabelCharity'})}</th>
                            <th className="text-right">{intl.formatMessage({id:'givingHistory|columnLabelAmount'})}</th>
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
