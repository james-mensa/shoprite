import { toast } from "react-toastify"
import { CubeSpinner } from "react-spinners-kit";
import { Type } from "react-bootstrap-icons";
import { format } from "date-fns";


export function FormatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
  
    return formattedDate;
  }

export const showToastify = (type, message) => {

    switch (type) {
        case "SUCCESS":
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case "ERROR":
            toast.error(message, {
                position: toast.POSITION.BOTTOM_LEFT

            })
            break;
        default:
            return null

    }


}




export const CheckTopAds=(ads)=>{
const div=document.querySelectorAll(".categorytem")
const profile_container=document.querySelectorAll(".profile_layout")
if(!ads){
    div.forEach((item)=>{
        if(item){
            item.classList.add("categorytem_margin")
          
    
        }
    })
    profile_container.forEach((item)=>{
        if(item){
            item.classList.add("addTopmarginprofile")
        }
    })
}
else{
    div.forEach((item)=>{
        if(item){
            item.classList.remove("categorytem_margin")
          
    
        }
    })
    profile_container.forEach((item)=>{
        if(item){
            item.classList.remove("addTopmarginprofile")
        }
    })

}




}



export const CheckHover=()=>{
    const topcatlayout=document.querySelectorAll(".topcatlayout")
    const catebtn=document.querySelectorAll(".catebtn")
    topcatlayout.forEach((item)=>{
        if(item){
            item.addEventListener("mouseover",(e)=>{
               
                item.firstChild.classList.add("showTopcat")
                item.firstChild.firstChild.classList.remove("topcat_panim")
                item.firstChild.firstChild.classList.add("topcat_p")
               
                
            

            })
            item.addEventListener("mouseout",(e)=>{
                item.firstChild.classList.remove("showTopcat")
                item.firstChild.firstChild.classList.remove("topcat_p")
                item.firstChild.firstChild.classList.add("topcat_panim")

            

            
                        })
        }

    })
}




  export function FormatTimeE(days) {
    if (isNaN(days) || days < 0) {
      return "Invalid input";
    }
  
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    const hours = remainingDays * 24;
  
    let result = "";
    
    if (weeks > 0) {
      result += weeks + " week" + (weeks > 1 ? "s" : "") + " ";
    }
  
    if (remainingDays > 0) {
      result += remainingDays + " day" + (remainingDays > 1 ? "s" : "") + " ";
    }
if(days <=0){
    return "Product Expired"
}
else{
    return result.trim();

}
   
   
  }
  

export function IsExpiringSoon(expiryDate) {
    // Create Date objects for the current date and the product's expiry date
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
  
    // Calculate the difference in days between the two dates
    const daysDifference = Math.floor(
      (expiry - currentDate) / (24 * 60 * 60 * 1000)
    );
  
    // Get the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    // Calculate the last day of the current month
    const lastDayOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
  
    // Calculate the number of days remaining in the current month
    const daysRemainingInMonth = lastDayOfMonth - currentDate.getDate() + 1;
  
    // Calculate the number of days from the start of the next month
    const daysInNextMonth = daysDifference - daysRemainingInMonth;
  
    // Check if the product expires within the next month
    return daysDifference

  }

export const CheckTopp=()=>{
    const div=document.querySelectorAll(".categorytem")
    const profile_container=document.querySelectorAll(".profile_layout")

        div.forEach((item)=>{
            if(item){
             

                if((item.classList.contains("categorytem"))){
                    item.classList.add("categorytem_margin")
                    item.classList.remove("categorytem")

                  
                }
              
               
              
        
            }
        })
        profile_container.forEach((item)=>{

            if(item){
                if(!(item.classList.contains("addTopmarginprofile"))){
                    item.classList.add("addTopmarginprofile")
                }
            }
        })
        
        
    
    }
    
    
    
    
    
    
    export function saveEditorContent(convertToRaw, editorState) {
        const contentState = convertToRaw(editorState.getCurrentContent());
        const contentString = JSON.stringify(contentState);
        return contentString;
      }