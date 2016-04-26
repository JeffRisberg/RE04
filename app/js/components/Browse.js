import React from 'react'
import { connect } from 'react-redux';

import { queryCategories } from '../actions/categories';
import { queryCharities } from '../actions/charities';

import Category from './Category'
import Charity from './Charity'
import CharityList from './CharityList'

/**
 * Renders a category list and a set of charities
 */
class Browse extends React.Component {
    constructor() {
        super();
        this.category = null;
    }

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const categoryRecords = this.props.categories.idList.map(id => this.props.categories.records[id]);

        let loadCharitiesHandler = (category) => {
            this.category = category;
            return this.props.onChangeCategory(category);
        };

        var categoryNodes = categoryRecords.map(function (category, index) {
            return (
                <Category category={category} loadCharities={loadCharitiesHandler} key={index}>
                </Category>
            );
        });

        const charityRecords = this.props.charities.idList.map(id => this.props.charities.records[id])
            .filter(charity => {
                return (this.category == null) || (charity.categoryId == this.category.id);
            }
        );

        var charityList = (charityRecords.length > 0)
            ? (<CharityList charities={charityRecords}/>)
            : null;

        var charityListHeader = (this.category != null)
            ? <div><h3>Displaying charities for {this.category.name}</h3></div>
            : null;

        return (
            <div className="container">
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
        category: state.category,
        charities: state.charities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            queryCategories()(dispatch);
            queryCharities(null)(dispatch);
        },
        onChangeCategory: (category) => {
            queryCharities(category)(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browse);
