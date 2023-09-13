import React, { useEffect, useState, useReducer } from "react";
import {
  ChatDots,
  
  Person,
  Postcard,
  PostcardFill,


} from "react-bootstrap-icons";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavLog from "../utils/signednav";
import { Signout, getAllUsers } from "../../store/actions/adminActions";
import LoaderView from "../utils/loaderView";
import TopNav from "../utils/pagenav";
import PostfoundCard from "./postmissingcard";


const OverView = () => {  
  const dispatch = useDispatch();

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
    return formattedDate;
  }

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
              
                >
                  {" "}
                  <Person size={25} />
                  <span> Over View</span>
                </p>
                <p
                    style={{
                    backgroundColor: "#E5EFF9",
                  }}    
                 >
                  {" "}
                  <PostcardFill size={20} />
                  <span> Found a missing Card </span>
                </p>
                <p>
                  <Postcard size={20} /> <span> Report my Missing card</span>
                </p>
                <p>
                  <ChatDots size={20} /> <span> Chat rooms</span>
                </p>
              </div>

              <p className="btn-signout"
                 onClick={()=>{
                dispatch(Signout())
              }}>Sign Out</p>
            </div>
            <div className="dashright">
                <PostfoundCard/>
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

export default OverView;
