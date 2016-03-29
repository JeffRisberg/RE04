import React from 'react'
import { Link } from 'react-router'

import NavLink from './NavLink'
import SessionStore from './SessionStore'

class App extends React.Component {
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
                <div className="navbar">
                    <div className="navbar-inner">
                        <div className="navbar-collapse collapse">
                            <div className="row" style={{background: '#eee'}}>
                                <div className="col-md-4" style={{marginTop: '20px', textAlign: 'left'}}>
                                    Search
                                </div>
                                <div className="col-md-4" style={{textAlign: 'center'}}>
                                    <h1 style={{marginTop: '10px'}}>RE04 Example</h1>
                                </div>
                                <div className="col-md-4" style={{marginTop: '20px', textAlign: 'right'}}>
                                    {headerText}
                                </div>
                            </div>

                            <ul className="nav navbar-nav" style={{background: '#ddd'}}>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/charityList">Charity List</NavLink></li>
                                <li><NavLink to="/givingHistory">Giving History</NavLink></li>
                                <li><NavLink to="/donationSummary">Table</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {this.props.children}
            </div>
        )
    }
}

export default App;
