import { combineReducers } from 'redux';
import contactsReducer from './contact/contactsReducer';


const rootReducer = combineReducers({
    contacts: contactsReducer,
});

export default rootReducer;
