import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HandIndex, Image } from "react-bootstrap-icons";
import {AddProduct,Deleteuser,getProducts} from "./../../store/actions/datacollection"
import { format } from 'date-fns';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Register,getAllUsers } from "../../store/actions/adminActions";
const EmployeeForm = () => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, 'EE LLL dd yyyy');
    return formattedDate;
  }
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const [startDate_m, setStartDate_m] = useState(new Date());
  const [startDate_e, setStartDate_e] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);
    
    }
  });
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllUsers())
  })
  const Formik = useFormik({
    initialValues: {
        fullname:"",
        email:""
     ,
        password:"",
     
        accountType:""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
        fullname: Yup.string().required("field required")
      
    
    }),
    onSubmit: (value) => {
    setload(true);
     dispatch(Register(value));
   
    },
  });

  const datnow = new Date();
  
  const checkdate = (daten) => {
    var givenDate = new Date(daten);

    // Get current date
    var currentDate = new Date();

    // Compare the year, month, and day of the given date with the current date
    var isToday =
      givenDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
      givenDate.getUTCMonth() === currentDate.getUTCMonth() &&
      givenDate.getUTCDate() === currentDate.getUTCDate();

    return isToday;
  };
  const handleChange = () => {};
  const Accounts=useSelector((data)=>data.allAccounts)
  return (
    <div className="userdetail">
      <p className="header">
      Account Management{" "}
        <span>
          
        </span>
      </p>
      <form onSubmit={Formik.handleSubmit} className="myform-report">
        <div className="formlayout">
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span> Full name
            </p>
            <TextField
              style={{ width: "90%" }}
              name="fullname"
              value={Formik.values.fullname}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.fullname && Boolean(Formik.errors.fullname)
              }
            ></TextField>
          </div>
          <div className="formlayout-p">
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> Email
            </p>
            <TextField
              style={{ width: "90%" }}
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.email && Boolean(Formik.errors.email)
              }
            ></TextField>
          </div>
        </div>

        <div className="formlayout">
      
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span>Password
            </p>
            <TextField
              style={{ width: "90%" }}
              name="password"
              type="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.password && Boolean(Formik.errors.password)}
            ></TextField>
          </div>
          <div className="formlayout-p">
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> Account Type
            </p>
            <Select
                  style={{ width: "90%" }}
                  placeholder="Admin or Employee"
                  name="accountType"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Formik.values.accountType}
                  defaultValue="Admin"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  error={
                    Formik.touched.accountType && Boolean(Formik.errors.accountType)
                  }
                  {...Formik.getFieldHelpers("accountType")}
                >
                  <MenuItem value="Adminstrator">Adminstrator</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
          </div>
        </div>

    

        <div className="sub-btn">
          {loading ? (
            <CircleSpinner color="aqua" />
          ) : (
            <>
              <Button type="submit">Add Account</Button>
             
            </>
          )}
        </div>
      </form>

    
      <p className="header"> Accounts</p>
      {

        Accounts && Accounts.data ?
        <>
          {

Accounts.data.length > 0  ?

<div className="missingreported">
        <div className="headert">
          <div className="header-col">No</div>
          <div className="header-col-h">Account name</div>
          <div className="header-col-h">Email</div>
          <div className="header-col-h">Role </div>
          <div className="header-column">Joined Since</div>
        
          <div className="header-column">Action</div>
        </div>
    <>
    {
        Accounts.data.map((user,index)=>{
  return(
    <div className="body-t" key={index}>
          <div className="body-col">{index+1}</div>
  
          <div className="body-col-h">{user.fullname}</div>
          <div className="body-col-h">{user.email}</div>
          <div className="body-col-h">{user.accountType}</div>
          <div className="body-column">{formatDate(user.createdAt)}</div>
          <div className="body-column">
            <span
            onClick={()=>dispatch(Deleteuser(user._id))}>Delete</span>
          </div>
        </div>
  )
})

}

    </>  

      
      </div>
      :<p>
        No Products added today !
      </p>

          }
        </>

:<p></p>
      }
    
    </div>
  );
};
export default EmployeeForm;
