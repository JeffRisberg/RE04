/**
 * This is used for the top charities display area
 */
import fetch from 'isomorphic-fetch';

export const getTopCharities = () => {
    return function (dispatch) {

        console.log("getting top charities");
        return fetch('/ws/topCharities', {})
            .then(response => response.json())
            .then((json) => {
                console.log(json.data);
                dispatch({
                        type: 'SET_TOP_CHARITIES',
                        topCharities: json.data
                    }
                );
            });
    };
};
