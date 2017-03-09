import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_COMPLETED_BASKET_ITEMS]: (state, action) => { // clear prior completed basket Items
        return action.data;
    }
}, {donations: []});

