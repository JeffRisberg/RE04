import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_BASKET_ITEMS]: (state, action) => {
        var basket = action.data;
        return basket;
    },

    [types.CLEAR_BASKET_ITEMS]: (state, action) => {
        return {donations: []}
    }
}, {donations: []});
