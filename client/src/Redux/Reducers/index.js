import {combineReducers} from "redux"
import UserReducer from "./UserReducer"
import ErrorsReducer from "./ErrorsReducer"

const rootReducer = combineReducers({UserReducer, ErrorsReducer})

export default rootReducer

