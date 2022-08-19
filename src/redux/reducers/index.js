import {combineReducers} from 'redux';
import contact from './contact';

const rootReducer = combineReducers({
  contactState: contact,
});

export default rootReducer;
