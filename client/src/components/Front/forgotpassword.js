import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { Avatar, IconButton, TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { SendresetLink, SignIn, preRegister } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";

const Forgotpass = () => {
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
        setload(false);

      if (notifications.success) {
        
        navigate("/");
      }
    
      
    }
  });

  const dispatch = useDispatch();
  const Formik = useFormik({
    initialValues: {
   
      email: "",
    
    
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
     
      email: Yup.string().required("field required").email("email invalid!"),
     
    }),
    onSubmit: (value) => {
    
      setload(true);
      dispatch(SendresetLink(value));
    },
  });

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
    
        <div className="formsp">
        <div style={{fontFamily:"Roboto condensed", padding:"40px", fontSize:"18px",marginBottom:"-50px"}}><p>
            Enter the email address associated with your account and we will send you a link to reset your account
        </p></div>
          <form onSubmit={Formik.handleSubmit} className="myform">
          <p><span style={{color:"red"}}>*</span> Email</p>
            <TextField
                      className="textfields"
              style={{ margin: "10px 10px 10px 0" }}
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.email && Boolean(Formik.errors.email)}
              helperText={Formik.touched.email && Formik.errors.email}
              {...Formik.getFieldHelpers("email")}
             
            ></TextField>

          
    
            {loading ? (
              <CircleSpinner color="aqua" />
            ) : (
              <Button
                type="submit"
                style={{ marginBottom: "50px", width: "40%" }}
              >
                Continue
              </Button>
            )}

            <div className="signin">
              <p>
                Don't have an account ? <span onClick={()=>navigate("/user/Signup")}>Create account</span>
              </p>
           
            </div>
          </form>
        </div>
  

      <div className="footer">
        <div className="frontitemhover">
          <p>
             Powered by Badu Tech. All rights reserved<span style={{ color: "green" }}> @ </span>{" "}
            2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
