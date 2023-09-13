import axios from "axios";
import * as notify from "./notification";

const {SUMMARY,FEEDRETURN,EXPIREP, NEWSALES,COMPLETEDQUIZES, API,ALLPRODUCTS,ALLSALES,MAIN_PRODUCT, SECTIONS,COURSES ,ACCESSCONTROL,ALLCOUPONS} = require("../type");

export const Product = (data) => ({
  type: MAIN_PRODUCT,
  payload: data,
});
export const Sales = (data) => ({
  type: ALLSALES,
  payload: data,
});

export const Result = (data) => ({
  type: SUMMARY,
  payload: data,
});


const Expiryproducts=(data)=>({
  type:EXPIREP,
  payload:data
})




export const Sales_new = (data) => ({
  type: NEWSALES,
  payload: data,
});




  export const Allproducts = (data) => ({
    type:ALLPRODUCTS,
    payload: data,
  });
  



  export const Allsales = (data) => ({
    type:ALLSALES,
    payload: data,
  });
  

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});

export const AddProduct= (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/session/addproduct`, data); 
      dispatch(
        Product(newd.data)
      );
      dispatch(
        notify.notify_success({
          msg: `new Course Add !!`,
        }))
      
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        }))
    }
  };
};
export const addSales = (data,user,customer,payment) => {
    return async (dispatch, getdispatch) => {
      try {
        const newd = await axios.post(`${API}/session/addsales/${user}/${customer}/${payment}`, data);
        dispatch(
          Sales_new(newd.data)

        );
        dispatch(
            notify.notify_success({
              msg: `Add !`,
            }))
  
      } catch (error) {
    
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
    };
  };
  

  export const Deleteuser= (id) => {
    return async (dispatch, getdispatch) => {
      try {
      
      await axios.delete(`${API}/user/deluser/${id}`);
        dispatch(
            notify.notify_success({
              msg: `User removed !!`,
            }))
      } catch (error) {
      
        dispatch(
          notify.notify_error({
            msg: `failed !!`,
          }))
      }
    };
  };
  

  export const Deleteproduct= (id) => {
    return async (dispatch, getdispatch) => {
      try {
      
      await axios.delete(`${API}/session/deleteproduct/${id}`);
        dispatch(
            notify.notify_success({
              msg: `product removed !!`,
            }))

      } catch (error) {
  
        dispatch(
          notify.notify_error({
            msg: `failed !!`,
          }))
      }
    };
  };
  

    export const getProducts = () => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.get(`${API}/session/getproducts`);
          dispatch(
            Allproducts(newd.data)
          );
      
        } catch (error) {
        
        }
      };
    };






    export const getExpiryProducts = () => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.get(`${API}/session/getexpiryproducts`);
          dispatch(
            Expiryproducts(newd.data)
          );
      
        } catch (error) {
        
        }
      };
    };
















    export const ProductClear = (data) => {

      return async (dispatch, getdispatch) => {
        try {

       
        dispatch(
          Product(null)
        );

        
        } catch (error) {
         
        }
      };
    };

    export const getCoursesP = (data) => {
      return async (dispatch, getdispatch) => {
        try {
     
          const newd = await axios.post(`${API}/session/getcoursespaginate`,data);
       

        let newdata=[...newd.data]; 
   
          const prevdata=getdispatch().coursesp
          if(prevdata){
            newdata=[...prevdata.AllcourseP,...newd.data];
  

        }
       
        dispatch(
       
        );

        
        } catch (error) {
        
        }
      };
    };


    export const getSales = () => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.get(`${API}/session/getsales`);
          
      dispatch(
        Sales(newd.data)

      );
        } catch (error) {
   
        }
      };
    };

    
    export const getSalesbyid = (id) => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.get(`${API}/session/getsales/${id}`);
          
      dispatch(
        Sales(newd.data)

      );
        } catch (error) {
       
        }
      };
    };


    export const updateProduct = (id,value) => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.patch(`${API}/session/modifyproduct/${id}`,value);
          
          dispatch(
            notify.notify_success({
              msg: `Updated!`,
            }))
  
      } catch (error) {
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
      };
    };


    export const updatequestions = (id,value) => {
      return async (dispatch) => {
        try {
          const newd = await axios.patch(`${API}/session/modifyquestion/${id}`,value);
          
          dispatch(
            notify.notify_success({
              msg: `Updated!`,
            }))
  
      } catch (error) {
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
      };
    };


    


 