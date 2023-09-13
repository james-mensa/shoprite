import {EXPIREP} from "./../type";

export default function SoonExpiry(state=null,action){

switch(action.type){
    case EXPIREP:
        return {...state, data:action.payload}
    default:
        return state
}
}