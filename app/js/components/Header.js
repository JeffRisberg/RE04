import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux';

import NavLink from './NavLink'
import { login, logout } from '../actions/donor';

/**
 * Appears at top of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30, 2016
 */
class Header extends React.Component {

    render() {
        var location = this.props.currentLocation.substring(1);
        var breadCrumb = null;

        if (location.startsWith("search")) breadCrumb = "Find a Charity";
        if (location.startsWith("basket")) breadCrumb = "Giving Basket";
        if (location.startsWith("donate")) breadCrumb = "Make a Donation";
        if (location.startsWith("checkout")) breadCrumb = "Checkout";
        if (location.startsWith("confirmation")) breadCrumb = "Confirmation";
        if (location.startsWith("givingHistory")) breadCrumb = "Giving History";

        var headerText = "Not logged in";
        let loginLogout = <Link to="/login" style={{marginLeft: '10px'}}>Login</Link>;
        if (this.props.donor != null) {
            var firstName = this.props.donor.firstName;
            var points = this.props.donor.points;

            headerText = firstName + " " + points + " points";
            loginLogout = <a onClick={this.props.logout} style={{marginLeft: '10px'}}>Logout</a>;
        }

        return (
            <div>
                <div className="header row white">
                    <div className="top-border"></div>
                    <div className="container">
                        <div className="logo col-md-4 col-xs-4">
                            <img src="/images/GoFar-logo-large.jpg" className="hidden-xs"/>
                            <img src="/images/GoFar-logo-small.jpg" className="visible-xs-block"/>
                        </div>

                        <div className="col-md-8 col-xs-7">
                            <div className="account-header-links text-right hidden-xs">
                                <a href="https://www.wellsfargo.com/" className="margin-r">wellsfargo.com</a>
                                <a href="#" className="margin-r">Rewards ID [ID]</a>
                                <a href="https://gofarrewards.wf.com/#/AccountSettings"
                                   className="margin-r">Settings</a>
                                <a href="https://gofarrewards.wf.com/#/Help" className="margin-r">Help</a>
                                <a data-toggle="modal" href="#" data-target="#spanishModal"
                                   className="margin-r">Español</a>
                                {loginLogout}
                            </div>

                            <div className="account-info text-right">
                                {headerText}
                            </div>
                        </div>
                        <div className="col-xs-1 visible-xs-block text-right">
                            <a id="dropdownMenuLabel" data-toggle="dropdown" data-target="#" href="#"
                               aria-expanded="false"
                               aria-haspopup="true">
                                <span className="glyphicon glyphicon-menu-hamburger"></span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLabel">
                                <li><a href="https://gofarrewards.wf.com/#/AccountSettings"
                                       className="margin-r">Settings</a></li>
                                <li><a href="https://gofarrewards.wf.com/#/Help" className="margin-r">Help</a></li>
                                <li><a data-toggle="modal" href="#" data-target="#spanishModal"
                                       className="margin-r">Español</a>
                                </li>
                                <li><a href="https://www.wellsfargo.com/" className="margin-r">wellsfargo.com</a></li>
                                <li><a href="#">Sign Off</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row darkgrey">
                    <div className="container">
                        <ul className="nav nav-pills nav-justified" role="tablist">
                            <li><a href="#myrewards" aria-controls="myrewards" role="tab" data-toggle="tab">My
                                Rewards</a></li>
                            <li><a href="#earn" aria-controls="earn" role="tab" data-toggle="tab">Earn</a></li>
                            <li><a href="#use" aria-controls="use" role="tab" data-toggle="tab">Use</a></li>
                            <li><a href="#share" aria-controls="share" role="tab" data-toggle="tab">Share</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row" style={{marginBottom: '2px'}}>
                    <div className="container">
                        <div className="col-md-9" style={{paddingTop: '15px'}}>
                            <NavLink to="/">Donate Home</NavLink>
                            {breadCrumb != null ? (' > ' + breadCrumb) : ''}
                        </div>
                        <div className="col-md-3" style={{textAlign: 'right'}}>
                            <NavLink to="/basket" style={{marginLeft: '10px'}}>
                                <div className="basket"/>
                            </NavLink>
                            <NavLink to="/givingHistory" style={{marginLeft: '10px'}}>
                                <div className="giving-history"/>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div id="sessionExpiredModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header" style={{color: 'white', background: '#AE2573'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title" style={{textAlign: 'center'}}>Attention</h4>
                            </div>
                            <div className="modal-body">
                                <p>Your session will end soon and you will be Signed Off. Would you like to continue your session?</p>
                            </div>
                            <div className="modal-footer" style={{textAlign: 'center'}}>
                                <button type="button" className="btn btn-default" data-dismiss="modal"
                                        style={{color: 'white', background: '#AE2573'}}>
                                    Continue
                                </button>
                            </div>
                        </div>

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
    mapStateToProps,
    {logout}
)(Header);

