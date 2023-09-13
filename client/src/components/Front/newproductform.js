import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HandIndex, Image } from "react-bootstrap-icons";
import {AddProduct,Deleteproduct,getProducts} from "./../../store/actions/datacollection"
import { format } from 'date-fns';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const NewProductf = () => {
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
    dispatch(getProducts())
  })
  const Formik = useFormik({
    initialValues: {
      productname: "",
      manufacturingdate: "",
      barcode: "",
      quantity: "",
      price: "",
      expiryday: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      productname: Yup.string().required("field required"),
     manufacturingdate: Yup.string().required("field required"),
      barcode: Yup.string().required("field required"),
      quantity: Yup.number().required("comfirm password"),
      price: Yup.number().required("field required"),
      expiryday:Yup.string().required("field required")
    }),
    onSubmit: (value) => {
    setload(true);
     dispatch(AddProduct(value));
  
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
  const allproducts=useSelector((data)=>data.Allproducts)
  return (
    <div className="userdetail">
      <p className="header">
        Add New Product{" "}
        <span>
          <HandIndex />
        </span>
      </p>
      <form onSubmit={Formik.handleSubmit} className="myform-report">
        <div className="formlayout">
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span> Product name
            </p>
            <TextField
              style={{ width: "90%" }}
              name="productname"
              value={Formik.values.productname}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.productname && Boolean(Formik.errors.productname)
              }
            ></TextField>
          </div>
          <div className="formlayout-p">
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> Quantity
            </p>
            <TextField
              style={{ width: "90%" }}
              name="quantity"
              value={Formik.values.quantity}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.quantity && Boolean(Formik.errors.quantity)
              }
            ></TextField>
          </div>
        </div>

        <div className="formlayout">
      
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span>GH₵ Unit Price
            </p>
            <TextField
              style={{ width: "90%" }}
              name="price"
              value={Formik.values.price}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.price && Boolean(Formik.errors.price)}
            ></TextField>
          </div>
          <div className="formlayout-p">
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> Barcode
            </p>
            <TextField
              style={{ width: "90%" }}
              name="barcode"
              value={Formik.values.barcode}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.barcode && Boolean(Formik.errors.barcode)
              }
            ></TextField>
          </div>
        </div>

        <div className="formlayout">
        
         
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span>Expiryday
            </p>
            <DatePicker
            className="datepic"

            style={{ width: "90%" }}
              name="expiryday"
             selected={startDate_e} onChange={(date) => {
              setStartDate_e(date)
              Formik.setFieldValue("expiryday",date)
              }} />
          </div>
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span>Manufacturing date
            </p>
            <DatePicker
            className="datepic"
            style={{ width: "90%" }}
              name="manufacturingdate"
             selected={startDate_m} onChange={(date) => {setStartDate_m(date)
              Formik.setFieldValue("manufacturingdate",date)
             }} />
          
          </div>
        </div>

        <div className="sub-btn">
          {loading ? (
            <CircleSpinner color="aqua" />
          ) : (
            <>
              <Button type="submit">Add Product</Button>
             
            </>
          )}
        </div>
      </form>

    
      <p className="header"> Products Add Today</p>
      {

        allproducts && allproducts.data ?
        <>
          {

allproducts.data.filter((data)=>checkdate(data.createdAt)
).length > 0  ?

<div className="missingreported">
        <div className="headert">
          <div className="header-col">No</div>
          <div className="header-col-h">Product name</div>
          <div className="header-column">Quantity</div>
          <div className="header-column">Unit Price (GH₵) </div>
          <div className="header-column">Total Price (GH₵)</div>
          <div className="header-column">Expiry</div>
          <div className="header-column">Action</div>
        </div>
    <>
    {
      allproducts.data.filter((data)=>checkdate(data.createdAt)
).map((product,index)=>{
  return(
    <div className="body-t" key={index}>
          <div className="body-col">{index+1}</div>
  
          <div className="body-col-h">{product.productname}</div>
          <div className="body-column">{product.quantity}</div>
          <div className="body-column">{product.price}</div>
          <div className="body-column">{product.quantity * product.price}</div>
          <div className="body-column">{formatDate(product.expiryday)}</div>
          <div className="body-column">
            <span
            onClick={()=>{
              dispatch(Deleteproduct(product._id))
            }}>Delete</span><span style={{marginLeft:"5px"}}>Sale now</span>
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
export default NewProductf;
