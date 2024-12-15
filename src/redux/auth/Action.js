//v2 : https://www.youtube.com/watch?v=qis9sMaiqN4&ab_channel=CodeWithZosh
import { API_BASE_URL } from "@/config/api"
import {GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS} from "./ActionTypes"
import axios from "axios"

//store.js allow to store our jwt in parallel to local storage of browser, and this is dispatched by using reducer 17min
export const register = userData=> async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        if(data.jwt){
            //here we store our jwt inside local storage 1h40min
            localStorage.setItem('jwt', data.jwt)

            //here we store our data in our local store as well 1h40min
            dispatch({type: REGISTER_SUCCESS, payload: data})
        }
        console.log('register success : ', data)
    } catch(error) {
        console.log('error = ', error)
    }
    
}

export const login = userData=> async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, userData)
        if(data.jwt){
            localStorage.setItem('jwt', data.jwt)
            dispatch({type: LOGIN_SUCCESS, payload: data})
        }
        console.log('login success : ', data)
    } catch(error) {
        console.log('error = ', error)
    }
    
}

export const getUser = () => async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        //no need to provide body (.. ,userData) because it's GET method v2min19 instead we should provide header
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                //"Authorization" string because it's JSON format min20
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });
        //1h34min https://www.youtube.com/watch?v=qis9sMaiqN4&ab_channel=CodeWithZosh
        //if(data.jwt){ 
        //    localStorage.setItem('jwt', data.jwt)
            dispatch({type: GET_USER_SUCCESS, payload: data})
        //}
        //console.log('user success : ', data)
    } catch(error) {
        console.log('error = ', error)
    }
    
}

//async(dispatch) is a thunk middlware 21min (middleware is the relation between back and front)
export const logout = ()=> async(dispatch)=>{
    dispatch({type:LOGOUT})
    localStorage.clear();
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, userData)
        if(data.jwt){
            localStorage.setItem('jwt', data.jwt)
            dispatch({type: LOGIN_SUCCESS, payload: data})
        }
        console.log('login success : ', data)
    } catch(error) {
        console.log('error = ', error)
    }
    
}
