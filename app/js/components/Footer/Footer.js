import React from 'react'
import { Link } from 'react-router'

import './Footer.scss';

/**
 * Appears at bottom of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30, 2016
 */
class Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="footer" style={{marginLeft: '+15px', marginRight: '+15px'}}>
                    <div className="row white footer-links">
                        <div className="col-md-6 text-left">
                            <a href="">Help</a>
                            <a href="" className="margin-l">Contact Us</a>
                        </div>
                        <div className="col-md-6 text-right">
                            <a href="" className="margin-r">
                                Account Settings
                            </a>
                            <a href="" className="margin-r">
                                Privacy Policy
                            </a>
                            <a href="">Terms and Conditions</a>
                        </div>
                    </div>
                    <div className="row dark-gray copyright">
                        <div className="col-md-12 text-right">
                            Copyright &copy; 2015-2016 Squirrel Legend Games, Inc. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
