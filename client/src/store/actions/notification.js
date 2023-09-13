
import { NOTIFYCLEAR ,NOTIFYERROR,NOTIFYSUCC,TEMPORARY,TEMPORARYCLEAR
} from  "./../type";
export const notify_success=(data)=>({

type:NOTIFYSUCC,
payload:data
})
export const notify_error=(data)=>({

    type:NOTIFYERROR,
    payload:data
    })

export const notify_clear=()=>({
            type:NOTIFYCLEAR,
       
    }
)


export const tempStore=(data)=>({

    type:TEMPORARY,
    payload:data
})


export  const clearTemp=()=>(
    {

        type:TEMPORARYCLEAR,
        
    }
)



export const ClearNotify=()=>{
    return async(dispatch)=>{

        try {
         
            dispatch(notify_clear());
           
           

        } catch (error) {
            dispatch(notify_error({msg:error.response.data}))
            
        }
    }
}
