import React from 'react'

import Header from './Header/Header'
import Footer from './Footer/Footer'

/**
 * @author Jeff Risberg
 * @since April 2016
 */
class AppRoot extends React.Component {

    render() {

        const currentLocation = this.props.location.pathname;

        return (
            <div className="container-fluid">
                <Header currentLocation={currentLocation} />

                <div className="container" style={{minHeight: '400px'}}>
                    {this.props.children}
                </div>

                <div className="container">
                    <Footer/>
                </div>
            </div>
        )
    }
}
AppRoot.contextTypes = {
    location: React.PropTypes.object
};

export default AppRoot;
