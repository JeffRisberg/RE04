import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import basketItems from './reducers/basketItems';
import categories from './reducers/categories';
import currentCategory from './reducers/currentCategory';
import currentCharities from './reducers/currentCharities';
import donor from './reducers/donor';
import topCharities from './reducers/topCharities';
import transactions from './reducers/transactions';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Search from './components/Search.js';
import GivingHistory from './components/GivingHistory.js';
import Basket from './components/Basket.js';
import Donate from './components/Donate.js';
import GiftMessage from './components/GiftMessage.js';
import UpdateDonation from './components/UpdateDonation.js';
import Confirmation from './components/Confirmation.js';

var initialContent = {
    basketItems: {donations: []},
    categories: {idList: [], records: {}},
    currentCategory: null,
    currentCharities: {idList: [], records: {}},
    donor: null,
    topCharities: {idList: [], records: {}},
    transactions: {idList: [], records: {}}
};

const reducers = combineReducers({
    basketItems,
    categories,
    currentCategory,
    currentCharities,
    donor,
    topCharities,
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
                <Route path="login" component={Login}/>
                <Route path="search" component={Search}/>
                <Route path="givingHistory" component={GivingHistory}/>
                <Route path="basket" component={Basket}/>
                <Route path="donate/:ein" component={Donate}/>
                <Route path="updateDonation/:donationId" component={UpdateDonation}/>
                <Route path="giftMessage/:donationId" component={GiftMessage}/>
                <Route path="confirmation/:orderId" component={Confirmation}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);
