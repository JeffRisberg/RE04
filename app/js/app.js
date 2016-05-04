import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import basketItems from './reducers/basketItems';
import completedBasketItems from './reducers/basketItems';
import categories from './reducers/categories';
import currentCategory from './reducers/currentCategory';
import currentCharities from './reducers/currentCharities';
import donor from './reducers/donor';
import topCharities from './reducers/topCharities';
import transactions from './reducers/transactions';
import givingHistoryItems from './reducers/givingHistoryItems';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Search from './components/Search.js';
import GivingHistory from './components/GivingHistory.js';
import Basket from './components/Basket.js';
import Donate from './components/Donate.js';
import Checkout from './components/Checkout.js';
import Confirmation from './components/Confirmation.js';
import GiftMessage from './components/GiftMessage.js';
import UpdateDonation from './components/UpdateDonation.js';

var initialContent = {
    basketItems: {donations: []},
    completedBasketItems: {donations: []},
    categories: {idList: [], records: {}},
    currentCategory: null,
    currentCharities: {idList: [], records: {}},
    donor: null,
    topCharities: {idList: [], records: {}},
    transactions: {idList: [], records: {}},
    givingHistoryItems: {idList: [], records: {}}
};

const reducers = combineReducers({
    basketItems,
    completedBasketItems,
    categories,
    currentCategory,
    currentCharities,
    donor,
    topCharities,
    transactions,
    givingHistoryItems,
    routing: routerReducer
});

const store = createStore(
    reducers,
    initialContent,
    applyMiddleware(routerMiddleware(hashHistory), thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppRoot}>
                <IndexRoute component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="search" component={Search}/>
                <Route path="givingHistory" component={GivingHistory}/>
                <Route path="basket" component={Basket}/>
                <Route path="donate/:ein" component={Donate}/>
                <Route path="checkout" component={Checkout}/>
                <Route path="confirmation/:orderId" component={Confirmation}/>
                <Route path="updateDonation/:donationId" component={UpdateDonation}/>
                <Route path="giftMessage/:donationId" component={GiftMessage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);
