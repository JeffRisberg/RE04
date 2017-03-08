import { types } from '../types'

const categories = (state = [], action = {}) => {
    switch (action.type) {
        case types.SET_CATEGORIES: // clear prior categories
        {
            const idList = [];
            const records = {};

            action.categories.forEach(record => {
                records[record.id] = record;
                idList.push(record.id);
            });

            return {idList, records};
        }
        default:
            return state;
    }
};

export default categories;