import { GET_GIVING_HISTORY } from '../constants/ActionTypes'

const giving_history = (state = [], action = {}) => {
  switch (action.type) {
    case 'RESET_GIVING_HISTORY': // clear prior charities
    {
      const idList = [];
      const records = {};

      action.items.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_GIVING_HISTORY':
    {
      const idList = state.idList;
      const records = state.records;

      action.items.forEach(record => {
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

export default giving_history;
