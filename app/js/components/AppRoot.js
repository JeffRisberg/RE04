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
                <div className="navbar navbar-default">
                    <div className="navbar-inner">
                        <div className="navbar-collapse collapse">
                            <div className="row" style={{background: '#eee'}}>
                                <div className="col-md-3" style={{marginTop: '20px', textAlign: 'left'}}>
                                    Search
                                </div>
                                <div className="col-md-6" style={{textAlign: 'center'}}>
                                    <h1 style={{marginTop: '10px'}}>Wells Fargo Prototype</h1>
                                </div>
                                <div className="col-md-3" style={{marginTop: '20px', textAlign: 'right'}}>
                                    {headerText}
                                </div>
                            </div>

                            <ul className="nav navbar-nav">
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/search">Search Charities</NavLink></li>
                                <li><NavLink to="/browse">Browse Charities</NavLink></li>
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
