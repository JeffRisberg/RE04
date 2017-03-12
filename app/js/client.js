import React from "react";
import ReactDOM from "react-dom";
import {Router, hashHistory} from "react-router";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {routerReducer, routerMiddleware} from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import basketItems from "./reducers/basketItems";
import completedBasketItems from "./reducers/basketItems";
import categories from "./reducers/categories";
import currentCategory from "./reducers/currentCategory";
import currentCharities from "./reducers/currentCharities";
import donor from "./reducers/donor";
import givingHistoryItems from "./reducers/givingHistoryItems";
import topCharities from "./reducers/topCharities";
import routes from "./routes";

const reducers = combineReducers({
    basketItems,
    completedBasketItems,
    categories,
    currentCategory,
    currentCharities,
    donor,
    givingHistoryItems,
    topCharities,
    routing: routerReducer
});

const store = createStore(
    reducers,
    {},
    applyMiddleware(routerMiddleware(hashHistory), thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app-root')
);