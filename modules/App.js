import React from 'react'
import { Link } from 'react-router'

import NavLink from './NavLink'

export default React.createClass({
    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="navbar-inner">
                        <div className="navbar-collapse collapse">
                            <h1>RE04 Example</h1>
                            <ul className="nav navbar-nav" style={{background: '#eee'}}>
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
})
