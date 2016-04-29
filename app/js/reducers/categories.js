import { RESET_CATEGORIES } from '../constants/ActionTypes'

const categories = (state = [], action = {}) => {
  switch (action.type) {
    case 'SET_CATEGORIES': // clear prior categories
    {
      const idList = [];
      const records = {};

      action.categories.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_CATEGORIES': // not sure if this is called
    {
      const idList = state.idList;
      const records = state.records;

      action.categories.forEach(record => {
        const id = record.id;

        if (idList.indexOf(id) < 0) idList.push(id);
        records[id] = record;
      });

      return {idList, records};
    }
    default:
      return state;
  }
};

export default categories;