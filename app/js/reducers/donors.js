import { GET_CHARITY } from '../constants/ActionTypes'

const donors = (state = [], action = {}) => {
  switch (action.type) {
    case 'RESET_DONORS': // clear prior charities
    {
      const idList = [];
      const records = {};

      action.items.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_DONORS':
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

export default donors;