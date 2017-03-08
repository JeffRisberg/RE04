/**
 * This is used for the donor's completed basket confirmation.
 */
import fetch from 'isomorphic-fetch';

import { types } from '../types'

export const queryCompletedBasket = (orderId) => {
    return function (dispatch, getState) {

        return fetch('/ws/donors/' + getState().donor.donorId + '/history/' + orderId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().donor.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: types.SET_COMPLETED_BASKET_ITEMS,
                    data: json.data
                });
            });
    };
};
