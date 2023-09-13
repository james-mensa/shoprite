import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Filter, HandIndex, Image } from "react-bootstrap-icons";
import {AddProduct,Deleteproduct,getProducts, updateProduct,getExpiryProducts} from "./../../store/actions/datacollection"
import { format } from 'date-fns';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import UpdateForm from "./updateform";
import { FormatTimeE, IsExpiringSoon } from "../utils/reuseable";
const ExpiryForm = () => {
    
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, 'EE LLL dd yyyy');
    return formattedDate;
  }

  const [showmodify,setmodify] =useState(false)
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const [startDate_m, setStartDate_m] = useState(new Date());
  const [startDate_e, setStartDate_e] = useState(new Date());
  const [targetproduct,settarget]=useState([])
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {

        setTimeout(()=>{
            setmodify(false)
        },1000)
       

      setload(false);
    
    }
  });
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getExpiryProducts())
  })

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


 
  const allproducts=useSelector((data)=>data.SoonExpiry)
 const [searchdate,setsearchdate] =useState(new Date())
 const [productid,setproductid]=useState('')
  return (
    <div className="userdetail">

<p className="header">Products Soon to expire</p>
<div className="filterlayout">

<div className="filterdate">
    <p><Filter/> Filter </p> 
    <DatePicker
    className="datepic"
      selected={searchdate}  
      onChange={(date)=>setsearchdate(date)}
    />

</div>

</div>


      {

        allproducts && allproducts.data ?
        <>
          {

allproducts.data.length > 0  ?

<div className="missingreported">
        <div className="headert">
          <div className="header-col">No</div>
          <div className="header-col-h">Product name</div>
          <div className="header-column">Quantity</div>
          <div className="header-column">Unit Price (GH₵) </div>
          <div className="header-column">Total Price (GH₵)</div>
          <div className="header-column">Due Time </div>
        </div>
    <>
    {
      allproducts.data.map((product,index)=>{
  return(
    <div className="body-t" key={index}>
          <div className="body-col">{index+1}</div>
  
          <div className="body-col-h">{product.productname}</div>
          <div className="body-column">{product.quantity}</div>
          <div className="body-column">{product.price}</div>
          <div className="body-column">{product.quantity * product.price}</div>
          <div className="body-column">{FormatTimeE(IsExpiringSoon(product.expiryday)) }</div>
         
        </div>
  )
})

}

    </>  

      
      </div>
      :<p>
      No  Products found  !
      </p>

          }
        </>

:<p></p>
      }



















  
   
    
    </div>
  );
};
export default ExpiryForm;
