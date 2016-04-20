import { combineReducers } from 'redux'
import { charities } from './charity'
import { giving_history } from './giving_history'

const rootReducer = combineReducers({
  charities,
  giving_history
});

export default rootReducer
