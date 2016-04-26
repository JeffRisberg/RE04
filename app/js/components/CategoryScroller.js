import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { queryCategories } from '../actions/categories';

/**
 * Draws a left-right horizontal scroller of top categories
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class CategoryScroller extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const categoryRecords = this.props.categories.idList.map(id => this.props.categories.records[id]);

        const imageItems = categoryRecords.map(function (category, index) {
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
        charities: state.charities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            queryCategories()(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryScroller);
