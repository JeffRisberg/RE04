import { types } from '../types'

const completedBasketItems = (state = [], action = {}) => {
    switch (action.type) {
        case types.SET_COMPLETED_BASKET_ITEMS: // clear prior completed basket Items
        {
            return action.data;
        }
        default:
            return state;
    }
};

export default completedBasketItems;
