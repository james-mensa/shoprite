import {NEWSALES} from "../type";



export default function newSale(state=null,action){
    switch(action.type){
        case NEWSALES:
            return {...state,data:action.payload};
        default:
            return state;
    }
}


