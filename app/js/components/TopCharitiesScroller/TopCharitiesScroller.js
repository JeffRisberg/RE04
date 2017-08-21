import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { intlShape, FormattedMessage } from 'react-intl';

import { getTopCharities } from '../../actions/topCharities';

import './TopCharitiesScroller.scss';

/**
 * Draws a left-right horizontal scroller of the top charities.
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScroller extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    };

    componentDidMount() {
        this.props.getTopCharities();
    }

    render() {
        if (this.props.topCharities == undefined) return null;

        const topCharities =
            this.props.topCharities.idList.map((id) => {
                return this.props.topCharities.records[id]
            });

        // Remember that the topCharities are listCharity objects
        const imageItems =
            topCharities.map(function (topCharity, index) {
                const imagePath = '/images/' + topCharity.logoImage.path;
                const imageFile = topCharity.logoImage.fileName;
                const charity = topCharity.charity;

                return (
                    <li key={index} className="col-md-2">
                        <img className="thumbnail" src={ imagePath + imageFile} width="128" height="77"/>
                        <br/>
                        <Link to={"/donate/" + charity.ein} className="donate">
                            Donate Now
                        </Link>
                    </li>
                );
            });

        return (
            <div className="content-region">
                <div className="content-header"><FormattedMessage id='topCharities|title' /></div>

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

export default connect(
    mapStateToProps,
    {getTopCharities}
)(TopCharitiesScroller);
