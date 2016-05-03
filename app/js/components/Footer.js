import React from 'react'
import { Link } from 'react-router'

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
                <div className="row" style={{marginTop: '10px',  padding: '5px'}}>
                    <div className="col-md-12" style={{textAlign: 'center'}}>
                        Charitable donation services provided by <a>JustGive.org</a>
                    </div>
                </div>
                <div className="row" style={{background: '#888', color: 'white', padding: '5px'}}>
                    <div className="col-md-6" style={{textAlign: 'left'}}>
                        <a style={{color: 'white', marginLeft: '10px'}}>Help</a>
                        <a style={{color: 'white', marginLeft: '10px'}}>Contact Us</a>
                    </div>
                    <div className="col-md-6" style={{textAlign: 'right'}}>
                        <a style={{color: 'white',  marginLeft: '10px'}}>Privacy Policy</a>
                        <a style={{color: 'white',  marginLeft: '10px'}}>Terms and Conditions</a>
                    </div>
                </div>
                <div className="row" style={{background: '#222', color: 'white', padding: '5px'}}>
                    <div className="col-md-12" style={{textAlign: 'right'}}>
                        Copyright (c) 1999-2016 Wells Fargo Bank, N.A.  All Rights Reserved
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
