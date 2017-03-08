import { types } from '../types'

const currentCharities = (state = [], action = {}) => {
    switch (action.type) {
        case types.SET_CURRENT_CHARITIES: // clear prior charities
        {
            const idList = [];
            const records = {};

            action.charities.forEach(record => {
                records[record.id] = record;
                idList.push(record.id);
            });

            return {idList, records};
        }
        case types.APPEND_CURRENT_CHARITIES:
        {
            const updatedState = Object.assign({}, state);

            action.charities.forEach(record => {
                const id = record.id;

                if (updatedState.idList.indexOf(id) < 0) updatedState.idList.push(id);
                updatedState.records[id] = record;
            });

            return updatedState;
        }
        default:
            return state;
    }
};

export default currentCharities;