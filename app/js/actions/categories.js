import fetch from 'isomorphic-fetch';

export const queryCategories = () => {
    return function (dispatch) {

        return fetch('/ws/categories', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: 'RESET_CATEGORIES',
                    categories: json.data
                })
            });
    }
};

export const queryTopCategories = () => {
    return function (dispatch) {

        return fetch('/ws/categories', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: 'RESET_CATEGORIES',
                    categories: json.data
                })
            });
    }
};



