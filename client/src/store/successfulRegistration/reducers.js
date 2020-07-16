import { SUCCESSFUL_REGISTRATION } from './actions';

const defaultState = {
    isRegister: false
}

export const successfulRegistrationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SUCCESSFUL_REGISTRATION: {
            return {
                ...state,
                isRegister: action.payload
            }
        }
        default: {
            return state;
        }
    }
}