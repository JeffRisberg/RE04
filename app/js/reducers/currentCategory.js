import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_CURRENT_CATEGORY]: (state, action) => {
        const currentCategory = action.category;
        return currentCategory;
    },
}, null);