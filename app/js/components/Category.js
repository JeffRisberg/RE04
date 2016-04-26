import React from 'react'
import { Link } from 'react-router'

/**
 * Render one category
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class Category extends React.Component {
    constructor() {
        super();
        this.handleLoadCharities = this.handleLoadCharities.bind(this);
    }

    handleLoadCharities() {
        console.log("loading charities for category " + this.props.category.name);
        this.props.loadCharities(this.props.category);
    }

    render() {
        return (
            <div onClick={this.handleLoadCharities}>
                <strong>{this.props.category.name}</strong>
            </div>
        )
    }
}

export default Category;