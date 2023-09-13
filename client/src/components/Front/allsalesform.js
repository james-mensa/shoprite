import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Filter, HandIndex, Image } from "react-bootstrap-icons";
import {AddProduct,Deleteproduct,getProducts, getSales} from "./../../store/actions/datacollection"
import { format } from 'date-fns';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import UpdateForm from "./updateform";
const AllSalesF = () => {
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
    dispatch(getSales())
  })

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


 
  const allSales=useSelector((data)=>data.Allsales)
 const [searchdate,setsearchdate] =useState(new Date())
 const [productid,setproductid]=useState('')
 const Checkuser = useSelector((item) => item.authuser);
 const [userId,setId]=useState("")
 useEffect(()=>{
  if(Checkuser && Checkuser.account){
    setId(Checkuser.account._id)
  }
 })
  return (
    <div className="userdetail">
    

<p className="header"> Sales Dashboard</p>
<div className="filterlayout">

<div className="filterdate">
    <p><Filter/> Filter </p> 
    <DatePicker
    className="datepic"
      selected={searchdate}  
      onChange={(date)=>setsearchdate(date)}
    />

</div>
<div className="filterproductname">
    <p><Filter/> Search </p> 

    <div className="searchbox">
              <input
                className="searchbox_field"
                placeholder="customer name or purchase Id"
              ></input>
              <span className="searchbtn">Search</span>
            </div>
</div>
</div>


      {

        allSales && allSales.data ?
        <>
          {

 allSales.data.length > 0  ?

<div className="missingreported">
        <div className="headert">
          <div className="header-col">No</div>
          <div className="header-column">Purchase Id</div>
          <div className="header-col-h">Product name</div>
          <div className="header-column">Quantity</div>
          <div className="header-column">Price (GH₵) </div>
          <div className="header-col-h">Customer</div>
          <div className="header-col-h">Issuied By</div>
          <div className="header-column">Date</div>
        </div>
        <>
          {
            Checkuser && Checkuser.account &&  Checkuser.account.accountType ==="Employee" ?
    
<>
{
        allSales.data.filter(bill=> bill.issuer ?  bill.issuer._id ===userId : "").map((Item,index)=>{
  return(
    <div className="body-t" key={index}>
          <div className="body-col">{index+1}</div>
          <div className="body-column">{Item.purchasecode}</div>
          <div className="body-col-h">{Item.product ? Item.product.productname :""} </div>
          <div className="body-column">{Item.quantity }</div>
          <div className="body-column">{Item.price}</div>
          <div className="body-col-h">{Item.customer}</div>
          <div className="body-col-h">{Item.issuer ? Item.issuer.fullname :"" }</div>
          <div className="body-column">{formatDate(Item.createdAt)}</div>
        </div>
  )
})

}

</>
:null
          }
        </>
  


        <>
          {
            Checkuser && Checkuser.account &&  Checkuser.account.accountType !=="Employee" ?
    
<>
{
        allSales.data.map((Item,index)=>{
  return(
    <div className="body-t" key={index}>
          <div className="body-col">{index+1}</div>
          <div className="body-column">{Item.purchasecode}</div>
          <div className="body-col-h">{Item.product ? Item.product.productname :""} </div>
          <div className="body-column">{Item.quantity }</div>
          <div className="body-column">{Item.price}</div>
          <div className="body-col-h">{Item.customer}</div>
          <div className="body-col-h">{Item.issuer ? Item.issuer.fullname :"" }</div>
          <div className="body-column">{formatDate(Item.createdAt)}</div>
        </div>
  )
})

}

</>
:null
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



















{
    showmodify ?

    <p className="header">
        Modify Product{" "}
        <span>
          <HandIndex />
        </span>
      </p>
      :null
}
   

   
    
    </div>
  );
};
export default AllSalesF;
