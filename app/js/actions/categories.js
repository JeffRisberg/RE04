import fetch from 'isomorphic-fetch';

export const queryCategories = () => {
    return function (dispatch) {

        return fetch('/ws/categories', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: 'SET_CATEGORIES',
                    categories: json.data
                })
            });
    }
};




