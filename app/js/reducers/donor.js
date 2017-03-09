import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_DONOR]: (state, action) => {
        var donor = action.donor;
        return donor;
    },
    [types.CLEAR_DONOR]: (state, action) => {
        return null;
    }
}, null);