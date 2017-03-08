/**
 * This is used for givinghistory display
 */
import fetch from 'isomorphic-fetch';

import { types } from '../types'

export const queryGivingHistory = (token, donor, year = '2016') => {
    return function (dispatch) {

        var url = "/ws/donors/" + donor.donorId + "/history?year=" + year;

        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: types.SET_GIVING_HISTORY,
                    data: json.data
                });
            });
    };
};

