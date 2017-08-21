import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { injectIntl, intlShape } from 'react-intl';
import './CharityList.scss';

/**
 * Renders a list of charity objects
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class Charity extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
        charity: PropTypes.object.isRequired,
    };

    render() {
        const { intl, charity } = this.props;

        return (
            <tr>
                <td><p>
                    <strong>{charity.name}</strong>
                    <br/>
                    {charity.city},&nbsp;
                    {charity.state}&nbsp;
                    {charity.zip}
                    <br/>
                    Tax ID: {charity.ein}
                </p></td>
                <td style={{ textAlign: 'right' }}>
                    <Link to={"/donate/" + charity.ein} className="donate">
                        {intl.formatMessage({ id: 'guide|donateNow' })}
                    </Link>
                </td>
            </tr>
        )
    }
}

class CharityList extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
        charities: PropTypes.array.isRequired,
    };

    render() {
        const { intl, charities } = this.props;

        const charityNodes = charities.map(function (charity, index) {
            return (
                <Charity intl={intl} charity={charity} key={index}/>
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

export default injectIntl(CharityList);