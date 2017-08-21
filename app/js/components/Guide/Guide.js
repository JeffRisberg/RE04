import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { queryCategories } from '../../actions/categories';
import { queryCategoryCharities } from '../../actions/currentCharities';
import Category from '../Category';
import CharityList from '../CharityList/CharityList';
import './Guide.scss';

/**
 * Renders a category list on the left, and a set of charities for the selected category on
 * the right.
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class Guide extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
        categories: PropTypes.object.isRequired,
        currentCategory: PropTypes.object,
        currentCharities: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.queryCategories();
    }

    render() {
        const intl = this.props.intl;
        const currentCategory = this.props.currentCategory;
        const categoryRecords = this.props.categories.idList.map(id => this.props.categories.records[id]);

        const loadCharitiesHandler = (category) => {
            return this.props.queryCategoryCharities(category);
        };

        const categoryNodes = categoryRecords.map(function (category, index) {
            const active = (currentCategory != undefined && category == currentCategory);

            return (
                <Category category={category}
                    active={active}
                    loadCharities={loadCharitiesHandler}
                    key={index}>
                </Category>
            );
        });

        const charityRecords = this.props.currentCharities.idList.map(id => this.props.currentCharities.records[id]);

        const charityList = (charityRecords.length > 0) ? (<CharityList charities={charityRecords}/>) : null;

        const charityListHeader = (currentCategory != null)
            ? <div><h3>Displaying charities for {currentCategory.name}</h3></div>
            : null;

        return (
            <div className="content-region">
                <div className="content-header">
                    {intl.formatMessage({ id: 'guide|title' })}
                </div>

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

export default injectIntl(connect(
    mapStateToProps,
    { queryCategories, queryCategoryCharities }
)(Guide));
