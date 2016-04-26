import { RESET_LIST_CHARITIES } from '../constants/ActionTypes'

const listCharities = (state = [], action = {}) => {
  switch (action.type) {
    case 'RESET_LIST_CHARITIES': // clear prior categories
    {
      const idList = [];
      const records = {};

      action.listCharities.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_LIST_CHARITIES':
    {
      const idList = state.idList;
      const records = state.records;

      action.listCharities.forEach(record => {
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

export default listCharities;