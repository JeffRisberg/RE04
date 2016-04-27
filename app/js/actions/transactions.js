/**
 * This is used for the giving-history component.
 */
import fetch from 'isomorphic-fetch';

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
        type: 'SET_TRANSACTIONS',
        transactions
    };
};

export const addTransaction = (transaction) => {
    return {
        type: 'ADD_TRANSACTION',
        transaction
    };
};
