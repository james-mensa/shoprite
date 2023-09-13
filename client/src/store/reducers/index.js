import { combineReducers } from "redux";

import notification from "./notification";
import personal from "./personal";

import authuser from "./authuser";


import newproduct from "./newproduct";
import Allproducts from "./allproducts";
import Allsales from "./allsales";
import newSale from "./newsales";
import allAccounts from "./allusers";
import SoonExpiry from "./exper";

const appReducers = combineReducers({
  personal,
  authuser,
  notification,
  newproduct,
  Allproducts,
  Allsales,
  newSale,
  allAccounts,SoonExpiry
  
});

export default appReducers;
