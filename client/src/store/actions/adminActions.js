import axios from "axios";
import * as notify from "./notification";
import { Axiosinstance, Getusercookie } from "./usercookie";
import cookie from "react-cookies";
const { USER_DETAIL, USERS, NEW_USER, PRE_REGISTER,API } = require("../type");

export const get_users = (detail) => ({
  type: USERS,
  payload: detail,
});


export const userDetail = (data) => ({
  type: USER_DETAIL,
  payload: data,
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const content = await axios.get(`${API}/user/alluser`);
      dispatch(get_users(content.data));
    } catch (error) {}
  };
};

export const Register = (userdata) => {
  return async (dispatch, getdispatch) => {
    try {
     const newd = await axios.post(`${API}/user/addusers`, userdata);
      
      dispatch(
        notify.notify_success({
          msg: "Please check your mail to verify account",
        })
      );
    } catch (error) {
      console.log(error.response.data);
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};


export const updateAccount = (data, id) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.patch(`${API}/user/modifyuser/${id}`,data);
      dispatch(userDetail({ account: profiledetail.data, auth: true }));
   
      dispatch(notify.notify_success({ msg: "Account Updated" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};

export const UpdatePass = (data, id) => {
  return async (dispatch) => {
    try {

      const profiledetail = await axios.patch(`${API}/user/userresetpass/${id}`,data);
      dispatch(userDetail({ account: profiledetail.data, auth: true }));
      dispatch(notify.notify_success({ msg: "Account Password Updated" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
    }
  }; 
};



export const SignIn = (data) => {
  return async (dispatch) => {
    try {
  
      const profiledetail = await axios.post(`${API}/user/signin`, data);
      dispatch(userDetail({ account: profiledetail.data, auth: true }));
      dispatch(
        notify.notify_success({
          msg: `${profiledetail.data.fullname} Welcome back!!`,
        })
      );
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
      dispatch(userDetail({ loading: false })); 
    }
  };
};





export const Signout=()=>{
  return async(dispatch)=>{

cookie.remove("authuser");
 dispatch(userDetail({ account: {}, auth: false,loading: false }));
 dispatch(
  notify.notify_success({
    msg: ` Hope to see u back !!`,
  })
 )
  } 
}

let token = Getusercookie()

const config = {
  headers: {
    'authuser': token,
    // other headers can be added here
  },
};


export const CheckLogin = () => {
  return async (dispatch) => {
    try {
await axios.post(`${API}/user/userprofile`, null,config);
 
    } catch (error) {
    
   
     
    }
  };
};



export const AutoLogin = () => {
  return async (dispatch) => {
    try {

      const profiledetail = await axios.get(`${API}/user/getprofile`);
   
     dispatch(userDetail({ account: profiledetail.data, auth: true,loading: false }));

    } catch (error) {
     
      dispatch(userDetail({  auth: false,loading: true }));
     
    }
  };
};

export const SendresetLink = (data) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.post(`${API}/user/userforgotpass`, data);
      dispatch(notify.notify_success({ msg: "Check your mails" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};

export const Passwordreset = (data) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.patch(
        "/user/passwordforgotreset",
        data
      );
      dispatch(notify.notify_success({ msg: "Welcome back" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};
