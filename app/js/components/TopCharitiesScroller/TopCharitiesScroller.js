import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { getTopCharities } from '../../actions/topCharities';
import './TopCharitiesScroller.scss';

/**
 * Draws a left-right horizontal scroller of the top charities.
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScroller extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
        topCharities: PropTypes.object,
    };

    componentDidMount() {
        this.props.getTopCharities();
    }

    render() {
        const topCharities = this.props.topCharities;

        if (topCharities == undefined) return null;

        const topCharitiesList =
            topCharities.idList.map((id) => {
                return topCharities.records[id]
            });

        // Remember that the topCharities are listCharity objects
        const imageItems =
            topCharitiesList.map(function (topCharity, index) {
                const imagePath = '/images/' + topCharity.logoImage.path;
                const imageFile = topCharity.logoImage.fileName;
                const charity = topCharity.charity;

                return (
                    <li key={index} className="col-md-3">
                        <img className="thumbnail" src={ imagePath + imageFile} width="128" height="77"/>
                        <br/>
                        <Link to={"/donate/" + charity.ein} className="donate">
                            <FormattedMessage id='topCharities|donateNow'/>
                        </Link>
                    </li>
                );
            });

        return (
            <div className="content-region">
                <div className="content-header"><FormattedMessage id='topCharities|title'/></div>

                <div className="row">
                    <div className="col-md-12">
                        <ul className="horizontal-slide">
                            {imageItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topCharities: state.topCharities
    };
};

export default injectIntl(connect(
    mapStateToProps,
    { getTopCharities }
)(TopCharitiesScroller));
