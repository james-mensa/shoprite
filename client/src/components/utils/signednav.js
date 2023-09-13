import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckProfile } from "./responsehover";
import { CheckTopAds } from "./reuseable";

const TopNavLog = (props) => {
  const navigate = useNavigate();
  const [searchvalue, setSearchValue] = useState("");
  const Checkuser = useSelector((item) => item.authuser);
  useEffect(() => {
   // CheckProfile(props.setprofile);
  });
  useEffect(() => {
    CheckTopAds(props.topads);
  });
 
  const handlesearchbox = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="navbar">
      <div className="navcontainer">
        <div className="sitename">
        <div className="companyn" >
            {" "}
            <img
            onClick={()=>{
          navigate("/")
        }}
         
              alt=""
              src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/math_61.png57345.512299217786"
            />{" "}
            <p 
            onClick={()=>{
          navigate("/")
        }}
            style={{ color: "white", marginLeft: "10px" }}>Mathic</p>
            {
                props.show ?
                <span className="playgame mobile"  onClick={() => navigate("/playgame")}>Lets Play</span>
      :null

            }
            </div>
         
        </div>
      </div>
      <div>{
        props.show ? 
        <span className="playgame desktopNav"   onClick={() => navigate("/playgame")}>Lets Play</span>:null
      } </div>
    
      <div className="navcontainerlog">
    
      {Checkuser && Checkuser.auth ? (
          <>
          
            <div className="uavatar" onClick={() =>navigate("/user/dashboard")}>
            <img  alt=""
            style={{width:"30px",height:"30px"}}
            src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/gamer.png63926.8325918976"/>
            {
              Checkuser && Checkuser.account ?
              <p className="presshoverAv">
             { Checkuser.account.fullname}
              </p>
              :null 
             }

             
            </div>
          </>
        ) : (
          <div className="userlog">

            <div className="signup">
              {" "}
              <span onClick={() => navigate("/user/Signup")}>Join Now</span>
            </div>
            <div className="logincss">
              {" "}
              <span style={{marginLeft:"15px"}} onClick={() => navigate("/user/login")}>Login</span>
            </div>
          </div>
        )}
            
      </div>
    </div>
  );
};

export default TopNavLog;
