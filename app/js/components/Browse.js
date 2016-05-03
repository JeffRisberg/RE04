import React from 'react'
import { connect } from 'react-redux';

import { queryCategories } from '../actions/categories';
import { queryCurrentCharities } from '../actions/currentCharities';

import Category from './Category'
import Charity from './Charity'
import CharityList from './CharityList'

/**
 * Renders a category list on the left, and a set of charities for the selected category on
 * the right.
 *
 * @author Jeff Risberg, Peter Cowan
 * @since April 2016
 */
class Browse extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const currentCategory = this.props.currentCategory;
        if (currentCategory == null) {
            this.props.queryCategories();
        }
    }

    render() {
        const currentCategory = this.props.currentCategory;

        const categoryRecords =
            this.props.categories.idList.map(id => this.props.categories.records[id]);

        let loadCharitiesHandler = (category) => {
            return this.props.queryCurrentCharities(category);
        };

        var categoryNodes = categoryRecords.map(function (category, index) {
            return (
                <Category category={category}
                          active={category == currentCategory}
                          loadCharities={loadCharitiesHandler}
                          key={index}>
                </Category>
            );
        });

        const charityRecords =
            this.props.currentCharities.idList.map(id => this.props.currentCharities.records[id]);

        var charityList = (charityRecords.length > 0)
            ? (<CharityList charities={charityRecords}/>)
            : null;

        var charityListHeader = (currentCategory != null)
            ? <div><h3>Displaying charities for {currentCategory.name}</h3></div>
            : null;

        return (
            <div className="container">
                <h3 style={{borderBottom: '3px solid black'}}>Find a Charity by Cause</h3>
                <div className="row">
                    <div className="col-md-2">
                        {categoryNodes}
                    </div>
                    <div className="col-md-10">
                        <div>{charityListHeader}</div>
                        {charityList}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        currentCategory: state.currentCategory,
        currentCharities: state.currentCharities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            dispatch(queryCategories());
        },
        onChangeCategory: (category) => {
            queryCurrentCharities(category)(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    {queryCategories, queryCurrentCharities}
)(Browse);
