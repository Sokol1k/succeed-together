import { CHANGE_HEADER } from './actions';

const defaultState = {
    headerColor: localStorage._token ? 'blue' : '',
}

export const headerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_HEADER:
            {
                return {
                    ...state,
                    headerColor: action.payload
                }
            }
        default:
            {
                return state;
            }
    }
}