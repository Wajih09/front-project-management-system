import * as actionTypes from "./ActionTypes"

const initialState = {
    //we have only 1 user subscription so it's nul and not []  1h24min https://www.youtube.com/watch?v=qis9sMaiqN4&ab_channel=CodeWithZosh
    userSubscription: null,
    loading: false,
    error: null
}

export const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_SUBSCRIPTION_REQUEST:
        case actionTypes.UPGRADE_SUBSCRIPTION_REQUEST:
            //for any request we need to perform same task so we put all cases one after one withour same return 53min
            return { ...state, loading: true, error: null };

        case actionTypes.GET_USER_SUBSCRIPTION_SUCCESS:
            return { ...state, loading: false, userSubscription: action.payload, error: null };

        case actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS:
            return { ...state, loading: false, userSubscription: action.payload, error: null };

        case actionTypes.GET_USER_SUBSCRIPTION_FAILURE:
        case actionTypes.UPGRADE_SUBSCRIPTION_FAILURE:
            return {
                ...state, loading: false, error: action.paylaod //not action.error 1h25min
            };

        default:
            return state;
    }
}

export default subscriptionReducer;
