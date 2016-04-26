import { RESET_TRANSACTIONS } from '../constants/ActionTypes'

const transactions = (state = [], action = {}) => {
  switch (action.type) {
    case 'RESET_TRANSACTIONS': // clear prior transactions
    {
      const idList = [];
      const records = {};

      action.transactions.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_TRANSACTION':
    {
      const idList = state.idList;
      const records = state.records;

      action.transactions.forEach(record => {
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

export default transactions;
