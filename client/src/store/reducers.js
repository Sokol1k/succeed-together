import { combineReducers } from "redux";
import { headerReducer } from "./header/reducers";
import { successfulRegistrationReducer } from './successfulRegistration/reducers';
import { privateListReducer } from './privateList/reducers';

export default combineReducers({
    header: headerReducer,
    register: successfulRegistrationReducer,
    privateList: privateListReducer,
});