import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { getTopCharities } from '../actions/topCharities';

/**
 * Draws a left-right horizontal scroller of the top charities.
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScroller extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTopCharities();
    }

    render() {
        if (this.props.topCharities == undefined) return null;

        var topCharities =
            this.props.topCharities.idList.map((id) => {
                return this.props.topCharities.records[id]
            });

        // Remember that the topCharities are listCharity objects
        const imageItems =
            topCharities.map(function (topCharity, index) {
                var imagePath = '/images/' + topCharity.logoImage.path;
                var imageFile = topCharity.logoImage.fileName;
                var charity = topCharity.charity;

                return (
                    <li key={index} className="col-md-2">
                        <img className="thumbnail" src={ imagePath + imageFile} width="128" height="77"/>
                        <br/>
                        <Link to={"/donate/" + charity.ein} className="btn">
                            Donate Now
                        </Link>
                    </li>
                );
            });

        return (
            <div className="content-region">
                <div className="content-header">Top Charities</div>

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
