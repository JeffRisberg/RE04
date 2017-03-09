import {handleActions} from "redux-actions";
import {types} from "../types";

export default handleActions({
    [types.SET_CURRENT_CHARITIES]: (state, action) => {
        const idList = [];
        const records = {};

        action.charities.forEach(record => {
            records[record.id] = record;
            idList.push(record.id);
        });

        return {idList, records};
    },

    [types.APPEND_CURRENT_CHARITIES]: (state, action) => {
        const updatedState = Object.assign({}, state);

        action.charities.forEach(record => {
            const id = record.id;

            if (updatedState.idList.indexOf(id) < 0) updatedState.idList.push(id);
            updatedState.records[id] = record;
        });

        return updatedState;
    }
}, {idList: [], records: {}});
