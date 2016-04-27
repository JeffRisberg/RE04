import React from 'react'
import { connect } from 'react-redux';

import { queryCategories } from '../actions/categories';
import { queryCurrentCharities } from '../actions/currentCharities';

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

        const charityRecords = this.props.currentCharities.idList.map(id => this.props.currentCharities.records[id])
            .filter(charity => {
                return (this.category == null) || true || (charity.categoryId == this.category.id);
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
        currentCharities: state.currentCharities
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            queryCategories()(dispatch);
        },
        onChangeCategory: (category) => {
            queryCurrentCharities(category)(dispatch);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browse);
