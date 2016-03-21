import React from 'react'
import { Link } from 'react-router'

class Charity extends React.Component {
    render() {
        return (
            <tr>
                <td><p>
                {this.props.charity.name}
                <br></br>
                {this.props.charity.mission}
                <br></br>
                {this.props.charity.addressline1}
                <br></br>
                {this.props.charity.city},
                {this.props.charity.state}
                {this.props.charity.zip}
                <br></br>
                Tax ID: {this.props.charity.ein}
                </p></td>
                <td style={{textAlign: 'right'}}>
                    <Link to={"/donate/" + this.props.charity.id} className="btn">
                        Donate Now
                    </Link>
                </td>
            </tr>
        )
    }
}

export default Charity;