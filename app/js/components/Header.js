import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux';

import NavLink from './NavLink'

/**
 * Appears at top of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30. 2016
 */
class Header extends React.Component {
    render() {
        var headerText = "Not logged in";
        if (this.props.donor != null) {
            var firstName = this.props.donor.firstName;
            var points = this.props.donor.points;

            headerText = firstName + " " + points + " points";
        }

        return (
            <div>
                <div className="row" style={{background: '#fff'}}>
                    <div className="col-md-5" style={{margin: '10px 0px 10px 0px', textAlign: 'left'}}>
                        <Link to="/" style={{marginLeft: '16px'}}>
                            <img src="/images/WellsFargoLogo.jpg" border="0" width="60"/>
                        </Link>
                        <span style={{marginLeft: '15px', marginTop: '10px', fontWeight: 'bold', fontSize: '25px'}}>
                            GoFar Rewards
                        </span>
                    </div>
                    <div className="col-md-7" style={{marginTop: '10px', textAlign: 'right'}}>
                        <p>Rewards Id #12345
                            <a style={{marginLeft: '10px'}}>Account Settings</a>
                            <a style={{marginLeft: '10px'}}>Help</a>
                            <a style={{marginLeft: '10px'}}>Logout</a>
                        </p>

                        <p>
                            <strong>{headerText}</strong>
                        </p>
                    </div>
                </div>
                <div className="navbar navbar-inverse" style={{marginBottom: '7px', background: '#555'}}>
                    <div className="navbar-inner">
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav" style={{display: 'table', width: '100%'}}>
                                <li style={{width: '25%', borderRight: '4px solid black'}}>
                                    <a href="" style={{color: 'white', textAlign: 'center'}}>My Rewards</a>
                                </li>
                                <li style={{width: '25%', borderRight: '4px solid black'}}>
                                    <a href="" style={{color: 'white', textAlign: 'center'}}>Earn</a>
                                </li>
                                <li style={{width: '25%', borderRight: '4px solid black'}}>
                                    <a href="" style={{color: 'white', textAlign: 'center'}}>Use</a>
                                </li>
                                <li style={{width: '25%'}}>
                                    <a href="" style={{color: 'white', textAlign: 'center'}}>Share</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row" style={{background: '#fff', marginBottom: '10px'}}>
                    <div className="col-md-9">
                        Donate Home
                    </div>
                    <div className="col-md-3" style={{textAlign: 'right'}}>
                        <NavLink to="/basket" style={{marginLeft: '10px'}}>Basket</NavLink>
                        <NavLink to="/givingHistory" style={{marginLeft: '10px'}}>History</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.donor
    };
};
export default connect(
    mapStateToProps
)(Header);

