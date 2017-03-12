import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_DONOR]: (state, action) => {
        const donor = action.donor;
        return donor;
    },
    [types.CLEAR_DONOR]: () => {
        return null;
    }
}, null);