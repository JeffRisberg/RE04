import fetch from 'isomorphic-fetch';
import { RESET_GIVING_HISTORY } from '../constants/ActionTypes'

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
                    type: RESET_GIVING_HISTORY,
                    data: json.data
                });
            });
    };
};

