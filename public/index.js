import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from '../modules/App'
import Home from '../modules/Home'
import CharityList from '../modules/CharityList'
import Donate from '../modules/Donate'
import GivingHistory from '../modules/GivingHistory'
import About from '../modules/About'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="charityList" component={CharityList}/>
            <Route path="donate/:charityId" component={Donate}/>
            <Route path="givingHistory" component={GivingHistory}/>
            <Route path="about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'));
