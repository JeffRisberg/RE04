/**
 * This is used for categories fetch
 */
import fetch from 'isomorphic-fetch';

import { types } from '../types'

import { queryCategoryCharities } from '../actions/currentCharities';

export const queryCategories = () => {
    return function (dispatch) {

        return fetch('/ws/categories/guide', {})
            .then(response => response.json())
            .then((json) => {
                const categories = json.data;
                const firstCategory = categories[0];

                dispatch({
                    type: types.SET_CATEGORIES,
                    categories: json.data
                });

                dispatch(queryCategoryCharities(firstCategory));
            });
    }
};
