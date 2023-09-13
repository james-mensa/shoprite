import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { showToastify } from "./components/utils/reuseable";
import { ClearNotify } from "./store/actions/notification";
import "./components/style/custome.css";
import "./components/style/design.css";
import Resetpasspage from "./components/Front/resetpassword";

import { AutoLogin, CheckLogin, getAllUsers } from "./store/actions/adminActions";
import Login from "./components/Front/login";
import SignInUser from "./components/Front/signin";
import UserDashbord from "./components/Front/userprofile";

import Forgotpass from "./components/Front/forgotpassword";
import StartSale from "./components/Front/startsalespage";
import SalesPage from "./components/Front/allsalespage";
import ProductsPage from "./components/Front/productspage";
import NewProductPage from "./components/Front/newproductpage";
import ManageEnployee from "./components/Front/employeespage";
import NotificationExpiry from "./components/Front/expirypage";
import Authcontainer from "./components/utils/authuser";

function App() {
  const notifications = useSelector((value) => value.notification);
  const dispatch = useDispatch();
useEffect(()=>{
dispatch(getAllUsers())
},[dispatch])
  useEffect(() => {
    dispatch(CheckLogin());
  }, []);

  useEffect(() => {
    dispatch(AutoLogin());
  }, [dispatch]);

  useEffect(() => {
    if (notifications && notifications.notice) {
      if (notifications.success) {
        showToastify("SUCCESS", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      if (notifications.success === false) {
        showToastify("ERROR", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      window.scrollTo(0, 0);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/user/dashboard"
          element={
           <Authcontainer>
              <UserDashbord/>
           </Authcontainer>
            
          
          }
        />
      
        <Route
          path="/account/passwordreset"
          element={
          
              <Resetpasspage />
           
          }
        />
  
     
       
 
 
 
       <Route path="/user/dashboard/products" element={<Authcontainer><ProductsPage /></Authcontainer>}></Route>
       <Route path="/user/dashboard/newproduct" element={<Authcontainer><NewProductPage/></Authcontainer>}></Route>
       <Route path="/user/dashboard/newsales" element={<Authcontainer><StartSale/></Authcontainer>}></Route>
       <Route path="/user/dashboard/sales" element={<Authcontainer><SalesPage/></Authcontainer>}></Route>
       <Route path="/user/dashboard/notification" element={<Authcontainer><NotificationExpiry/></Authcontainer>}></Route>
       <Route path="/user/dashboard/employees" element={<Authcontainer><ManageEnployee /></Authcontainer>}></Route>

        <Route path="/" element={<SignInUser />}></Route>
        <Route path="/user/login/forgottenpassword" element={<Forgotpass/>}></Route>
      
    
     
 
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
