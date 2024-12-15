//v2: https://www.youtube.com/watch?v=qis9sMaiqN4&ab_channel=CodeWithZosh

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./auth/Reducer";
import { projectReducer } from "./project/Reducer";
import chatReducer from "./chat/Reducer";
import commentReducer from "./comment/Reducer";
import issueReducer from "./issue/Reducer";
import subscriptionReducer from "./subscription/Reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    //register this authReducer with the store, so whenever we want to access this authReducer inside component we need to use the key "auth" v2-27min
    auth: authReducer,
    project: projectReducer,
    chat: chatReducer,
    comment: commentReducer,
    issue: issueReducer,
    subscription: subscriptionReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));