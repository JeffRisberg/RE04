/**
 * This is used for the giving-history component.
 */
import fetch from 'isomorphic-fetch';

let nextTransactionId = 10;

export const fetchTransaction = () => {
    return function (dispatch) {

        return fetch('/ws/transactions', {})
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveTransactions(json.data));
            });
    };
};

export const fetchTransactions = () => {
    return function (dispatch) {

        return fetch('/ws/transactions', {})
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveTransactions(json.data));
            });
    };
};

export const receiveTransactions = (transactions) => {
    return {
        type: 'RECEIVE_TRANSACTIONS',
        transactions
    };
};

export const addTransaction = (text, time) => {
    return {
        type: 'ADD_TRANSACTION',
        id: nextTransactionId++,
        text,
        time
    };
};
