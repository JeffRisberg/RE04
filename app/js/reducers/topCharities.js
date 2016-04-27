import { RESET_LIST_CHARITIES } from '../constants/ActionTypes'

const topCharities = (state = [], action = {}) => {
  switch (action.type) {
    case 'SET_TOP_CHARITIES': // clear prior charities
    {
      const idList = [];
      const records = {};

      action.topCharities.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_TOP_CHARITIES': // probably not used
    {
      const idList = state.idList;
      const records = state.records;

      action.topCharities.forEach(record => {
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

export default topCharities;