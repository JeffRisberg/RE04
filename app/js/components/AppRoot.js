import React from 'react'
import { Link } from 'react-router'

import Header from './Header'
import Footer from './Footer'

class AppRoot extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <Header/>

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

export default AppRoot;
