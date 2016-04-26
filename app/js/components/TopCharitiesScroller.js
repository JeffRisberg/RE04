import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { getListCharities } from '../actions/listCharities';

/**
 * Draws a left-right horizontal scroller of charities in a specified category.
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScroller extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        // this is wrong
        const charityRecords = this.props.categories.idList.map(id => this.props.categories.records[id]);

        const imageItems = charityRecords.map(function (charity, index) {
            var imagePath = '/images/' + category.logoImage.path;
            var imageFile = category.logoImage.fileName;
            return (
                    <li key={index} className="col-md-2">
                        <img className="thumbnail" src={ imagePath + imageFile} width="128" height="77" />
                        <br/>
                        <Link to={"/donate/" /*+ listCharity.charity.ein*/} className="btn">
                            Donate Now
                        </Link>
                    </li>
            );
        });

        return (
            <div className="container">
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
        categories: state.categories,
        listCharities: state.listCharities,
        charities: state.charities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            getListCharities()(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopCharitiesScroller);
