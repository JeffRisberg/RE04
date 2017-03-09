import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_TOP_CHARITIES]: (state, action) => {
        const idList = [];
        const records = {};

        action.topCharities.forEach(record => {
            records[record.id] = record;
            idList.push(record.id);
        });

        return {idList, records};
    }
}, {idList: [], records: {}});