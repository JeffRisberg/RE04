/**
 * This is used for the donor's current basket.
 */
import fetch from 'isomorphic-fetch';

import { push } from 'react-router-redux'

export const queryBasket = () => {
    return function (dispatch) {

        return fetch('/ws/basket/fetch', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: "SET_BASKET_ITEMS",
                    data: json.data
                });
            });
    };
};

export const addToBasket = (donation, thenUrl) => {
    return function (dispatch) {

        return fetch('/ws/basket/donate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({donation: donation})
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(push(thenUrl));
            });
    };
};

