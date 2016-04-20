import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import store from './store';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import About from './components/About.js';
import Browse from './components/Browse.js';
import GivingHistory from './components/GivingHistory.js';

import { fetchCharities, fetchTransactions } from './actions/index.js';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppRoot}>
                <IndexRoute component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/browse" component={Browse}/>
                <Route path="/GivingHistory" component={GivingHistory}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);

fetchCharities()(store.dispatch);

fetchTransactions()(store.dispatch);