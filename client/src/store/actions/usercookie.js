import cookie from "react-cookies";

import axios from "axios";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});
export const GetGeoCookie =  () =>  cookie.load("geo");
export const Getusercookie =  () =>  cookie.load("authuser");
export let Axiosinstance=()=>axios.create({
 headers:{
  "authuser":Getusercookie()
 } 
})






