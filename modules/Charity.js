import React from 'react'
import { Link } from 'react-router'

class Charity extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <h4>{this.props.ein}</h4>
            </div>
        )
    }
}

export default Charity;