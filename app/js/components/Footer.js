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
            <div className="row" style={{marginTop: '10px', background: 'grey', color: 'white', padding: '5px'}}>
                <div className="col-md-4" style={{textAlign: 'left'}}>
                    left
                </div>
                <div className="col-md-4" style={{textAlign: 'center'}}>
                    center
                </div>
                <div className="col-md-4" style={{textAlign: 'right'}}>
                    right
                </div>
            </div>
        )
    }
}

export default Footer;
