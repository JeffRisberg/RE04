/**
 * This is used for fetching (paginated) set of charities given a category
 */
import fetch from 'isomorphic-fetch';

export const queryCurrentCharities = (category) => {
    return function (dispatch) {

        return fetch('/ws/charities/categories/' + category.id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: 'SET_CHARITIES',
                        charities: json.data
                    }
                );
            });
    };
};

export const queryCharity = (ein) => {
    return function (dispatch) {

        return fetch('/ws/charities/' + ein, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: 'SET_CHARITIES',
                        charities: json.data
                    }
                );
            });
    };
};
