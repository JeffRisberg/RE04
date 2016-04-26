import React from 'react'
import { Link } from 'react-router'

import NavLink from './NavLink'
import SessionStore from '../store/SessionStore'

class AppRoot extends React.Component {
    constructor() {
        super();

        SessionStore.addListener('change', () => {
            this.setState({
                token: SessionStore.getToken()
            })
        });
    }

    render() {
        var login = SessionStore.getLogin();
        var token = SessionStore.getToken();

        var headerText = (token != null ? ("Welcome, " + login) : "Please Login");

        return (
            <div>
                <div className="row" style={{background: '#eee'}}>
                    <div className="col-md-5" style={{margin: '10px 0px 10px 0px', textAlign: 'left'}}>
                        <Link to="/"><img src="/images/WellsFargoLogo.jpg" border="0" width="60"/></Link>
                        <span style={{marginLeft: '15px', fontWeight: 'bold', fontSize: '25px'}}>GoFar Rewards</span>
                    </div>
                    <div className="col-md-7" style={{marginTop: '20px', textAlign: 'right'}}>
                        {headerText}
                    </div>
                </div>
                <div className="navbar navbar-inverse">
                    <div className="navbar-inner">
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/search">Search Charities</NavLink></li>
                                <li><NavLink to="/givingHistory">Giving History</NavLink></li>
                                <li><NavLink to="/basket">Giving Basket</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {this.props.children}
            </div>
        )
    }
}

export default AppRoot;
