import { ALLPRODUCTS } from "../type";



export default function Allproducts(state=null,action){

    switch(action.type){
        case ALLPRODUCTS:
            return {...state, data:action.payload}
        default:
            return state
    }



}