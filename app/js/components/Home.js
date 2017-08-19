import React from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import TopCharitiesScroller from './TopCharitiesScroller/TopCharitiesScroller';
import Guide from './Guide/Guide';

class Home extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    };

    render() {
        const intl = this.props.intl;

        return (
            <div>
                <div>
                    <img src="/images/HomeImage.jpg" width="100%"/>
                </div>
                <div className="content-region">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>{intl.formatMessage({ id: 'home|topCharities' })}</h3>

                            <p>
                                Redeem your rewards, donate to a top charity.
                            </p>

                            <p>
                                <a onClick={() => ReactDOM.findDOMNode(this.refs.topCharities).scrollIntoView()}>
                                    View List
                                </a>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h3>{intl.formatMessage({ id: 'home|supportACause' })}</h3>

                            <p>Browse a list of popular charities by Cause</p>

                            <p>
                                <a onClick={() => ReactDOM.findDOMNode(this.refs.byCause).scrollIntoView()}>
                                    View Causes
                                </a>
                            </p>
                        </div>

                        <div className="col-md-4" style={{ background: '#f0f0f' }}>
                            <h3>{intl.formatMessage({ id: 'home|findACharity' })}
                            </h3>

                            <p>Search for any charity by name or location</p>

                            <p>
                                <Link to="/search">Search Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <TopCharitiesScroller ref='topCharities'/>
                <Guide ref='byCause'/>
            </div>
        )
    }
}

export default injectIntl(Home);