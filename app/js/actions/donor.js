/**
 * This is used for login and logout.
 */
import fetch from 'isomorphic-fetch';

export const login = (login, password) => {
    return function (dispatch) {

        return fetch('/ws/donor/login', {})
            .then(response => response.json())
            .then((json) => {
                dispatch(login(json.data));
            });
    };
};

