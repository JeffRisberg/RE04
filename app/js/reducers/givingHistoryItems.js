import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_GIVING_HISTORY]: (state, action) => {
        const idList = [];
        const records = {};

        action.data.forEach(record => {
            records[record.donationId] = record;
            idList.push(record.donationId);
        });

        return {idList, records};
    }
}, {idList: [], records: {}});

