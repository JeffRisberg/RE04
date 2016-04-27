/**
 * This is used for the top charities display area
 */
import fetch from 'isomorphic-fetch';

export const getTopCharities = () => {
    return function (dispatch) {

        return fetch('/ws/topCharities', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: 'SET_TOP_CHARITIES',
                        topCharities: json.data
                    }
                );
            });
    };
};
