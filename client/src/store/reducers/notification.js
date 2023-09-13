import {NOTIFYSUCC,NOTIFYCLEAR,NOTIFYERROR} from "./../type"
const states={
    success: null,

}
export default function notification(state=states,action){

switch(action.type){
    case NOTIFYSUCC:
        return {...state, notice:action.payload,success:true}
    case NOTIFYERROR:
        return {...state, notice:action.payload,success:false}
    case NOTIFYCLEAR:
        return {success:null};
    default:
        return state;

            
}
}