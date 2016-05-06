import { SET_CATEGORIES } from '../constants/ActionTypes'

const categories = (state = [], action = {}) => {
    switch (action.type) {
        case SET_CATEGORIES: // clear prior categories
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