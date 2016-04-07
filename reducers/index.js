import { combineReducers } from 'redux'
import charity from './charity'
import giving_history from './giving_history'

const rootReducer = combineReducers({
  charity,
  giving_history
})

export default rootReducer
