import {MAIN_PRODUCT} from "../type";



export default function newproduct(state=null,action){
    switch(action.type){
        case MAIN_PRODUCT:
            return {...state,data:action.payload};
        default:
            return state;
    }
}
