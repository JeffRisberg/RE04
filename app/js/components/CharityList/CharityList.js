import React from 'react'
import { Link } from 'react-router'

import './CharityList.scss';

/**
 * Renders a list of charity objects
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class Charity extends React.Component {

    render() {
        return (
            <tr>
                <td><p>
                    <strong>{this.props.charity.name}</strong>
                    <br/>
                    {this.props.charity.city},&nbsp;
                    {this.props.charity.state}&nbsp;
                    {this.props.charity.zip}
                    <br/>
                    Tax ID: {this.props.charity.ein}
                </p></td>
                <td style={{textAlign: 'right'}}>
                    <Link to={"/donate/" + this.props.charity.ein} className="donate">
                        Donate Now
                    </Link>
                </td>
            </tr>
        )
    }
}


class CharityList extends React.Component {

    render() {
        const charityNodes = this.props.charities.map(function (charity, index) {
            return (
                <Charity charity={charity} key={index}/>
            );
        });

        return (
                <table className="table">
                <tbody>
                {charityNodes}
                </tbody>
            </table>
        );
    }
}

export default CharityList;