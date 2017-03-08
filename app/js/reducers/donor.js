import { types } from '../types'

const donor = (state = [], action = {}) => {
  switch (action.type) {
    case types.SET_DONOR:
    {
      var donor = action.donor;
      return donor;
    }
    case types.CLEAR_DONOR:
    {
      return null;
    }
    default:
      return state;
  }
};

export default donor;