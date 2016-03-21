import React from 'react'
import { Link } from 'react-router'

class Charity extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.charity.name}</td>
                <td>{this.props.charity.ein}</td>
                <td>
                    <Link to={"/donate/" + this.props.charity.id} className="btn">
                        Donate Now
                    </Link>
                </td>
            </tr>
        )
    }
}

export default Charity;