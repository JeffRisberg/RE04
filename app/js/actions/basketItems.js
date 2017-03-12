/**
 * This is used for the donor's current basket.
 */
import fetch from 'isomorphic-fetch';

import { types } from '../types'

import { push } from 'react-router-redux'

export const queryBasket = () => {
    return function (dispatch, getState) {

        return fetch('/ws/basket', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().donor.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: types.SET_BASKET_ITEMS,
                    data: json.data
                });
            });
    };
};

export const addToBasket = (donation, ein, thenUrl) => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/donations/' + ein, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().donor.token
            },
            body: JSON.stringify(donation)
        })
            .then(response => response.json())
            .then(() => {
                dispatch(push(thenUrl));
            });
    };
};

export const updateDonation = (donation, ein) => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/donations/' + ein, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().donor.token
            },
            body: JSON.stringify(donation)
        })
            .then(response => response.json())
            .then((json) => {
                if (donation.giftName || donation.memorialName) {
                    dispatch(push('/giftMessage/' + json.data.id));
                } else {
                    dispatch(push('/basket'));
                }
            });
    };
};

export const clearBasket = () => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/clear', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().donor.token
            }
        })
            .then(response => response.json())
            .then(() => {
                dispatch({
                    type: types.CLEAR_BASKET_ITEMS
                });
            });
    };
};

export const checkout = (formData) => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/checkout', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().donor.token
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(() => {
                const nextUrl = '/confirmation/' + getState().donor.orderId;
                dispatch(push(nextUrl));
            });
    };
};

