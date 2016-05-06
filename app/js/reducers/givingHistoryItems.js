import { SET_GIVING_HISTORY } from '../constants/ActionTypes'

const givingHistoryItems = (state = [], action = {}) => {
    switch (action.type) {
        case SET_GIVING_HISTORY: // clear prior giving history
        {
            const idList = [];
            const records = {};

            action.data.forEach(record => {
                records[record.donationId] = record;
                idList.push(record.donationId);
            });

            return {idList, records};
        }
        default:
            return state;
    }
};

export default givingHistoryItems;
