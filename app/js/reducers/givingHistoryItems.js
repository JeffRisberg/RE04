import { RESET_GIVING_HISTORY } from '../constants/ActionTypes'

const givingHistoryItems = (state = [], action = {}) => {
    switch (action.type) {
        case 'RESET_GIVING_HISTORY': // clear prior giving history
        {
            const idList = [];
            const records = {};

            action.data.forEach(record => {
                records[record.id] = record;
                idList.push(record.id);
            });

            return {idList, records};
        }
        default:
            return state;
    }
};

export default givingHistoryItems;
