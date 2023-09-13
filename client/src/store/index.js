
import  {configureStore} from "@reduxjs/toolkit";
import appReducers from "./reducers";


const ReduxStore=configureStore({
    reducer:appReducers
    
})


export default ReduxStore;