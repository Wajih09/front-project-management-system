import api from "@/config/api";
import * as actionTypes from "./ActionTypes"

export const getUserSubscription = (jwt) => { //or we can directely remove jwt 3h58min
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_REQUEST })
        try {
            const response = await api.get(`/api/subscription/user`, {
                headers: { "Authorization": `Bearer ${jwt}` } //and provide it directely here provide the localStorage.getItem("jwt") 3h58min
            });
            dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_SUCCESS, payload: response.data });
            console.log("user's subcription = ", response.data);
        } catch (error) {
            console.log("error = ", error);
            dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_FAILURE, error: error.message });

        }
    }
}

export const upgradeSubscription = ({ planType }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_REQUEST })
        try {
            //body null 1h24min https://www.youtube.com/watch?v=qis9sMaiqN4&ab_channel=CodeWithZosh
            const response = await api.patch(`/api/subscription/upgrade`, null, {
                params: { planType: planType }});
            dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS, payload: response.data });
            console.log("upgraded subscription = ", response.data);
        } catch (error) {
            console.log("error = ", error);
            dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_FAILURE, payload: error.message });

        }
    }
}