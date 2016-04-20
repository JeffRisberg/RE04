import React from 'react'
import { Link } from 'react-router'

class Category extends React.Component {
    constructor() {
        super();
        this.handleLoadCharities = this.handleLoadCharities.bind(this);
    }

    render() {
        return (
            <div onClick={this.handleLoadCharities}>
                <strong>{this.props.category.name}</strong>
            </div>
        )
    }

    handleLoadCharities() {
        console.log("loading charities for category " + this.props.category.name);
        this.props.loadCharities(this.props.category);
    }
}

export default Category;