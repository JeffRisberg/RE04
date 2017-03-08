import { types } from '../types'

const currentCategory = (state = [], action = {}) => {
    switch (action.type) {
        case types.SET_CURRENT_CATEGORY: //
        {
            const currentCategory = action.category;
            return currentCategory;
        }
        default:
            return state;
    }
};

export default currentCategory;