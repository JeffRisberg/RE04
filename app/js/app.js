import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import About from './components/About.js';
import Browse from './components/Browse.js';
import GivingHistory from './components/GivingHistory.js';

var inventory = {
    items: {idList: [], records: {}},
    events: {idList: [], records: {}}
};

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const middleware = routerMiddleware(browserHistory);

const store = createStore(
    reducers,
    inventory,
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppRoot}>
                <IndexRoute component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/browse" component={Browse}/>
                <Route path="/givingHistory" component={GivingHistory}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);
