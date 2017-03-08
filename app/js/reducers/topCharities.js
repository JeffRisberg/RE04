import { types } from '../types'

const topCharities = (state = [], action = {}) => {
  switch (action.type) {
    case types.SET_TOP_CHARITIES:
    {
      const idList = [];
      const records = {};

      action.topCharities.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    default:
      return state;
  }
};

export default topCharities;