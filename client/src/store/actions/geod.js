import {API, GEO ,ipgeoAPI} from "./../type";
import axios from "axios";

export const GeoDetail = (item) => ({
  type: GEO,
  payload: item,
});
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});









export const GeoGet = () => {
  return async (dispatch) => {
    try {

    
      const responsefull = await axios.get(
        `https://api.ipdata.co/?api-key=${ipgeoAPI}`
      );
      const ipa = await responsefull.data;
   
      const country = await ipa.country_name;
      const userphonecode = await ipa.calling_code;
      const continent = await ipa.continent_name;
      const state_c = await ipa.region;
    
   
      
      const ipaddress = await ipa.ip;
      const newData={
        country: country,
        userphonecode: userphonecode,
        state_c: state_c,
        continent: continent,
        ipaddress: ipaddress,
      
      };
    
  
        const res = await axios.post(`${API}/ipaddress/userip`,newData);
        dispatch(GeoDetail(res.data));
      
    } catch (error) {
      
        
    }
 
  };
};
