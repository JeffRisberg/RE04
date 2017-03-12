/**
 * This is used for the top charities display area
 */
import fetch from "isomorphic-fetch";
import {types} from "../types";

export const getTopCharities = () => {
    return function (dispatch) {

        return fetch('/ws/topCharities', {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: types.SET_TOP_CHARITIES,
                    topCharities: json.data
                });
            });
    };
};
