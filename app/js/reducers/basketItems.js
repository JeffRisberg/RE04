import { types } from '../types'

const basketItems = (state = [], action = {}) => {
  switch (action.type) {
    case types.SET_BASKET_ITEMS: // clear prior basketItems
    {
      var basket = action.data;
      return basket;
    }
    case types.CLEAR_BASKET_ITEMS:
    {
      return {donations: []}
    }
    default:
      return state;
  }
};

export default basketItems;
