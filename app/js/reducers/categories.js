import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_CATEGORIES]: (state, action) => { // clear prior categories
        const idList = [];
        const records = {};

        action.categories.forEach(record => {
            records[record.id] = record;
            idList.push(record.id);
        });

        return {idList, records};
    }
}, {idList: [], records: {}, selected: null});
