import React from 'react'
import { Link } from 'react-router'

import NavLink from './NavLink'

export default React.createClass({
    render() {
        return (
            <div>
                <h1>RE04 Examples</h1>
                <ul role="nav">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/charityList">CharityList</NavLink></li>
                </ul>

                {/* add this */}
                {this.props.children}

            </div>
        )
    }
})
