import React from 'react'

/**
 * Render one category
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class Category extends React.Component {
    handleLoadCharities = () => {
        this.props.loadCharities(this.props.category);
    }

    render() {
        if (this.props.active) {
            return (
                <div style={{padding: '2px', background: 'black', color: 'white'}} onClick={this.handleLoadCharities}>
                    <strong>{this.props.category.name}</strong>
                </div>
            )
        }
        else {
            return (
                <div style={{padding: '2px'}} onClick={this.handleLoadCharities}>
                    <strong>{this.props.category.name}</strong>
                </div>
            )
        }
    }
}

export default Category;