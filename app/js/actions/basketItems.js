/**
 * This is used for the donor's current basket.
 */
import fetch from 'isomorphic-fetch';

import { push } from 'react-router-redux'

export const queryBasket = (token) => {
    return function (dispatch) {

        return fetch('/ws/basket', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: "SET_BASKET_ITEMS",
                    data: json.data
                });
            });
    };
};

export const addToBasket = (token, donation, ein, thenUrl) => {
    return function (dispatch) {

        return fetch('/ws/basket/donations/' + ein, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(donation)
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(push(thenUrl));
            });
    };
};

export const clearBasket = (token) => {
    return function (dispatch) {

        return fetch('/ws/basket/clear', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: "CLEAR_BASKET_ITEMS"
                });
            });
    };
};


