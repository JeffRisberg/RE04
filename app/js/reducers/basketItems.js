import { SET_BASKET_ITEMS } from '../constants/ActionTypes'

const basketItems = (state = [], action = {}) => {
  switch (action.type) {
    case 'SET_BASKET_ITEMS': // clear prior basketItems
    {
      var basket = action.data;
      return basket;
    }
    case 'CLEAR_BASKET_ITEMS':
    {
      return {donations: []}
    }
    default:
      return state;
  }
};

export default basketItems;
