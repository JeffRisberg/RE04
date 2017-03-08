/**
 * This is used for fetching (paginated) set of charities given a category
 */
import fetch from 'isomorphic-fetch';

import { types } from '../types'

export const queryCategoryCharities = (category) => {
    return function (dispatch) {

        return fetch('/ws/charities/categories/' + category.id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: types.SET_CURRENT_CATEGORY,
                    category: category
                });
                dispatch({
                    type: types.SET_CURRENT_CHARITIES,
                    charities: json.data
                });
            });
    };
};

export const queryCharity = (id) => {
    return function (dispatch) {

        return fetch('/ws/charities/' + id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: types.APPEND_CURRENT_CHARITIES,
                        charities: [json.data]
                    }
                );
            });
    };
};

export const queryCharityByEin = (ein) => {
    return function (dispatch) {

        return fetch('/ws/charities/byEin/' + ein, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: APPEND_CURRENT_CHARITIES,
                        charities: [json.data]
                    }
                );
            });
    };
};

