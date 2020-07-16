import { PRIVATE_LIST } from './actions';   

const defaultState = {
    lists: []
}

export const privateListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRIVATE_LIST: {
            return {
                ...state,
                lists: action.payload.data
            }
        }
        default: {
            return state;
        }
    }
}