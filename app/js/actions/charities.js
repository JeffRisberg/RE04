/**
 * This is used for charity fetches, including charitylists.
 */
import fetch from 'isomorphic-fetch';

export const queryCharities = () => {
    return function (dispatch) {

        return fetch('/ws/charities', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: 'RESET_CHARITIES',
                        charities
                    }
                );
            });
    };
};

export const getCharity = (id) => {
    return function (dispatch) {

        return fetch('/ws/charities/' + id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: 'APPEND_CHARITIES',
                    charities: json.data
                })
            });
    }
};

