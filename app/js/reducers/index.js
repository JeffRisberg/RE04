import { combineReducers } from 'redux'

import { charities } from './charities'
import { giving_history } from './giving_history'

export default combineReducers({
  charities,
  giving_history
});