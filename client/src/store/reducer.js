import * as actionTypes from './actions';

const initialState = {
    currentUser: '',
    isLoggedIn: false
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.LOGIN:
            return {
                ...state,
                currentUser: action.username,
                isLoggedIn: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: ''
            }
        default:
            return state
    }
}

export default reducer;