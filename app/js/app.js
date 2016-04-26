import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import basketItems from './reducers/basketItems';
import categories from './reducers/categories';
import charities from './reducers/charities';
import donor from './reducers/donor';
import listCharities from './reducers/listCharities';
import transactions from './reducers/transactions';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Search from './components/Search.js';
import GivingHistory from './components/GivingHistory.js';
import Basket from './components/Basket.js';
import Donate from './components/Donate.js';
import Confirmation from './components/Confirmation.js';

var initialContent = {
    basketItems: {idList: [], records: {}},
    categories: {idList: [], records: {}},
    charities: {idList: [], records: {}},
    donor: null,
    listCharities: {idList: [], records: {}},
    transactions: {idList: [], records: {}}
};

const reducers = combineReducers({
    basketItems,
    categories,
    charities,
    donor,
    listCharities,
    transactions,
    routing: routerReducer
});

const middleware = routerMiddleware(browserHistory);

const store = createStore(
    reducers,
    initialContent,
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppRoot}>
                <IndexRoute component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/search" component={Search}/>
                <Route path="/givingHistory" component={GivingHistory}/>
                <Route path="/basket" component={Basket}/>
                <Route path="/donate/:ein" component={Donate}/>
                <Route path="confirmation/:orderId" component={Confirmation}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);
