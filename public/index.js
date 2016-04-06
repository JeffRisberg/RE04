import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from '../modules/App'
import Home from '../modules/Home'
import Login from '../modules/Login'
import About from '../modules/About'
import CharityList from '../modules/CharityList'
import Donate from '../modules/Donate'
import GivingHistory from '../modules/GivingHistory'
import Basket from '../modules/Basket'
import Checkout from '../modules/Checkout'
import Confirmation from '../modules/Confirmation'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="about" component={About}/>
            <Route path="charityList" component={CharityList}/>
            <Route path="donate/:charityId" component={Donate}/>
            <Route path="givingHistory" component={GivingHistory}/>
            <Route path="basket" component={Basket}/>
            <Route path="checkout" component={Checkout}/>
            <Route path="confirmation/:orderId" component={Confirmation}/>
        </Route>
    </Router>
), document.getElementById('app'));
