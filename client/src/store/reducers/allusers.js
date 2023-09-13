import {USERS} from "./../type";



export default function allAccounts(state=null,action){
    switch(action.type){
        case USERS:
            return {...state,data:action.payload};
        default:
            return state;
    }
}


