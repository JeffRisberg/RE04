import fetch from 'isomorphic-fetch';

import { queryCurrentCharities } from '../actions/currentCharities';

export const queryCategories = () => {
    return function (dispatch, getState) {

        return fetch('/ws/categories/guide', {})
            .then(response => response.json())
            .then((json) => {
                const categories = json.data;
                const firstCategory = categories[0];

                dispatch({
                    type: 'SET_CATEGORIES',
                    categories: json.data
                });

                queryCurrentCharities(firstCategory)(dispatch);
            });
    }
};

