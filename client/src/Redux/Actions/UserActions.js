import { CURRENTUSER, FAIL, LOGIN, LOGOUT, REGISTER } from "../ActionsTypes/UserTypes"
import axios from "axios"
import { handleError } from "./ErrorActions"
export const register=(newUser, navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post('/user/SignUp', newUser)

        dispatch(
            {
                type : REGISTER,
                payload : res.data
            }
        )

        navigate('/Profil')
    } catch (error) {
        // dispatch(
        //     {
        //         type : FAIL,
        //         payload : error.response.data.errors
        //     }
        // )

        error.response.data.errors.forEach(el => {
            dispatch(handleError(el.msg))
        });
    }
}

export const login=(cordUser, navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post('/user/SignIn', cordUser)

        dispatch(
            {
                type : LOGIN,
                payload : res.data
            }
        )

        navigate('/Profil')
    } catch (error) {
        //  dispatch(
        //     {
        //         type : FAIL,
        //         payload : error.response.data.errors
        //     }
        // )
          error.response.data.errors.forEach(el => {
            dispatch(handleError(el.msg))
        });
    }
}


export const currentUser=()=>async(dispatch)=>{
    try {

        const config = {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }

        const res = await axios.get('/user/currentUser', config)

        dispatch(
            {
                type : CURRENTUSER,
                payload : res.data
            }
        )
    } catch (error) {
         dispatch(
            {
                type : FAIL,
                payload : error.response.data.errors
            }
        )
    }
}

export const logout=()=>{
    return(
        {
            type : LOGOUT
        }
    )
}