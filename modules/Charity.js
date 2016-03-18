import React from 'react'
import { Link } from 'react-router'

class Charity extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.params.charityName}</h2>
                <h4>{this.props.params.ein}</h4>
            </div>
        )
    }
}

export default Charity;