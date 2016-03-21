import React from 'react'
import { Link } from 'react-router'

class Charity extends React.Component {
    render() {
        return (
            <tr>
                <td><p>
                    <strong>{this.props.charity.name}</strong>
                <br></br>
                {this.props.charity.addressline1}
                <br></br>
                {this.props.charity.city},&nbsp;
                {this.props.charity.state}&nbsp;
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