import React, { useEffect, useState, useReducer } from "react";
import {
  BarChartFill,
  CalendarPlus,
  ChatDots,
  CloudCheck,
  Globe,
  MenuAppFill,
  Person,
  Postcard,
  PostcardFill,
  Stopwatch,
  Trophy,
  WalletFill,
} from "react-bootstrap-icons";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TopNavLog from "../utils/signednav";
import { Signout, getAllUsers } from "../../store/actions/adminActions";
import LoaderView from "../utils/loaderView";
import TopNav from "../utils/pagenav";
import UserProFile from "./userOverview";
import AllSalesF from "./allsalesform";

const SalesPage = () => {
  const navigateTo=useNavigate();
  const dispatch = useDispatch();

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
    return formattedDate;
  }
  const Checkuser = useSelector((item) => item.authuser);
 

  return (
    <>
      <div
        className="mainLayoutb"
        style={{
          minHeight: `${window.innerHeight}px`,
        }}
      >
        <div
          className="dashfront"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <TopNav />

         
          <div
            className="dashlayout"
            style={{
              minHeight: `${window.innerHeight}px`,
            }}
          >
            <div className="dashleft">
            <div className="content-nav">
                <p
                 
                  onClick={()=>navigateTo("/user/dashboard")}
                >
                  {" "}
                  <BarChartFill size={25} />
                  <span> Summary</span>
                </p>
                {
          Checkuser && Checkuser.account &&  Checkuser.account.accountType ==="Employee" ? 
          null
          :

                <p

onClick={()=>navigateTo("/user/dashboard/products")}
                
                >
                  {" "}

                  <CloudCheck size={20} />
                  <span> Show Products</span>
                </p>
                }
                
                {
          Checkuser && Checkuser.account &&  Checkuser.account.accountType ==="Employee" ? 
          null
          :
          <p 
          
                
                onClick={()=>navigateTo("/user/dashboard/newproduct")}
                >
                  <MenuAppFill size={20} /> <span> New Products</span>
                </p>}
              
             
             
                <p   onClick={()=>navigateTo("/user/dashboard/newsales")}>

                  <CalendarPlus size={20} /> <span> Start Sales</span>
                </p>
                <p
                style={{
                    backgroundColor: "#E5EFF9",
                  }}   onClick={()=>navigateTo("/user/dashboard/sales")}>
                  <WalletFill size={20} /> <span> Sales Records</span>
                </p>
                <p   onClick={()=>navigateTo("/user/dashboard/notification")}>
                  <Stopwatch size={20} /> <span> Expiry Notifcation</span>
                </p>
         {
          Checkuser && Checkuser.account &&  Checkuser.account.accountType ==="Employee" ? 
          null
          :  <p       onClick={()=>navigateTo("/user/dashboard/employees")}>
                  <Person size={20} /> <span> Manage Employees</span>
                </p>
         }    
              
              </div>
              <p className="btn-signout"
              onClick={()=>{
                dispatch(Signout())
              }}
              >Sign Out</p>
            </div>
            <div className="dashright">
              <AllSalesF/>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="frontitemhover">
            <p>
              Powered by BaduTech All rights reserved
              <span style={{ color: "green" }}> @ </span> 2023
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPage;
