import { RESET_TRANSACTIONS } from '../constants/ActionTypes'

const basketItems = (state = [], action = {}) => {
  switch (action.type) {
    case 'RESET_BASKET_ITEMS': // clear prior basketItems
    {
      const idList = [];
      const records = {};

      action.transactions.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case 'APPEND_BASKET_ITEM':
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

export default basketItems;
