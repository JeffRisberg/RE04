import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import ConnectedIntlProvider from './utils/ConnectedIntlProvider';
import reducers from './reducers';
import routes from './routes';

const logger = createLogger();

const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
    logger
];

const store = createStore(
    reducers,
    {},
    applyMiddleware(...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <Router history={hashHistory} routes={routes}/>
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('app-root')
);
