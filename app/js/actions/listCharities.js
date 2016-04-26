/**
 * This is used for charity Lists
 */
import fetch from 'isomorphic-fetch';

export const getListCharities = (id) => {
    return function (dispatch) {

        return fetch('/ws/listCharities' + id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: 'RESET_LISTCHARITIES',
                        listCharities: json.data
                    }
                );
            });
    };
};
