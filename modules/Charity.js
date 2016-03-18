import React from 'react'
import { Link } from 'react-router'

class Charity extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.ein}</td>
            </tr>
        )
    }
}

export default Charity;