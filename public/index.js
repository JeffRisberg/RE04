import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from '../modules/App'
import About from '../modules/About'
import CharityList from '../modules/CharityList'
import Home from '../modules/Home'

React.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/charities" component={CharityList}/>
            <Route path="/about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'));