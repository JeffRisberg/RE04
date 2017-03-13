import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import NavLink from "../NavLink";
import Svg from "../Svg/Svg";
import {logout} from "../../actions/donor";
import "./Header.scss";
import icon from '../../../images/RE04LogoSVG.svg';

/**
 * Appears at top of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30, 2016
 */
class Header extends React.Component {

    render() {
        const location = this.props.currentLocation.substring(1);
        let breadCrumb = null;

        if (location.startsWith("search")) breadCrumb = "Find a Charity";
        if (location.startsWith("basket")) breadCrumb = "Giving Basket";
        if (location.startsWith("donate")) breadCrumb = "Make a Donation";
        if (location.startsWith("checkout")) breadCrumb = "Checkout";
        if (location.startsWith("confirmation")) breadCrumb = "Confirmation";
        if (location.startsWith("givingHistory")) breadCrumb = "Giving History";

        let headerText = "Not logged in";
        let loginLogout = <Link to="/login" className="margin-l">Login</Link>;
        if (this.props.donor != null) {
            const firstName = this.props.donor.firstName;
            const points = this.props.donor.points;

            headerText = firstName + " " + points + " points";
            loginLogout = <a onClick={this.props.logout} className="margin-l">Logout</a>;
        }

        return (
            <div>
                <div className="header white">
                    <div className="header__top-border"></div>
                    <div className="container">
                        <div className="row">
                            <div className="header__logo col-md-4 col-xs-5">
                                <Svg markup={{icon}}/>
                            </div>

                            <div className="col-md-8 col-xs-7">
                                <div className="account-header-links text-right hidden-xs">
                                    <a href="" className="margin-l">Settings</a>
                                    <a href="" className="margin-l">Help</a>
                                    {loginLogout}
                                </div>

                                <div className="header__account-info text-right">
                                    {headerText}
                                </div>
                            </div>
                            <div className="col-xs-1 visible-xs-block text-right">
                                <a id="dropdownMenuLabel" data-toggle="dropdown" data-target="#" href="#"
                                   aria-expanded="false"
                                   aria-haspopup="true">
                                    <span className="glyphicon glyphicon-menu-hamburger"/>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLabel">
                                    <li><a href="" className="margin-l">Settings</a></li>
                                    <li><a href="" className="margin-l">Help</a></li>
                                    <li><a href="#" className="margin-l">Sign Off</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="header__bottom-border"></div>
                </div>

                <div className="row" style={{marginBottom: '2px'}}>
                    <div className="container">
                        <div className="col-md-9" style={{paddingTop: '15px'}}>
                            <NavLink to="/">Donate Home</NavLink>
                            {breadCrumb != null ? (' > ' + breadCrumb) : ''}
                        </div>
                        <div className="col-md-3" style={{textAlign: 'right'}}>
                            <NavLink to="/basket" style={{marginLeft: '10px'}}>
                                <div className="header__basket"/>
                            </NavLink>
                            <NavLink to="/givingHistory" style={{marginLeft: '10px'}}>
                                <div className="header__giving-history"/>
                            </NavLink>
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

