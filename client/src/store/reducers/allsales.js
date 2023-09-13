import {ALLSALES} from "../type";



export default function Allsales(state=null,action){
    switch(action.type){
        case ALLSALES:
            return {...state,data:action.payload};
        default:
            return state;
    }
}
