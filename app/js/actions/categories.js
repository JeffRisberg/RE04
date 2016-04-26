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

export const getCategory = (id) => {
    return function (dispatch) {

        return fetch('/ws/categories/' + id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: 'APPEND_CATEGORIES',
                    categories: json.data
                })
            });
    }
};




