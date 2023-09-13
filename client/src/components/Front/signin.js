import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { Avatar, IconButton, TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { SignIn, preRegister } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";

const SignInUser = () => {
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
  const Checkuser = useSelector((item) => item.authuser);
 


  useEffect(() => {
    if (Checkuser) {
      if (Checkuser && Checkuser.auth) {
        navigate("/user/dashboard");
      }
    }else{
      navigate("/");
    }
  });

  const dispatch = useDispatch();
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().required("field required"),
      email: Yup.string().required("field required").email("email invalid!"),
    }),
    onSubmit: (value) => {
  
      setload(true);
      dispatch(SignIn(value));
    },
  });

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >    <h1>Login</h1>
      
      <div className="formsp">
  
        <form onSubmit={Formik.handleSubmit} className="myform">
          <p>
            <span style={{ color: "red" }}>*</span> Email
          </p>
          <TextField
            style={{ margin: "0px 10px 10px 0" }}
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.email && Boolean(Formik.errors.email)}
          ></TextField>
          <p>
            <span style={{ color: "red" }}>*</span> Password
          </p>
          <input
            className="inputfield"
            placeholder="Password"
            type="password"
            style={{ margin: "0px 10px 10px 0" }}
            name="password"
            value={Formik.values.password}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.password && Boolean(Formik.errors.password)}
            helperText={Formik.touched.password && Formik.errors.password}
            {...Formik.getFieldHelpers("password")}
            label="Password"
          ></input>

          <div></div>
          {loading ? (
            <div style={{
                display:"flex",
                width:'100%',
              justifyContent:"center",
              alignItems: 'center',
                
            
              }}>
                 <CircleSpinner color="aqua" />

           
              </div>
          
          ) : (
            <Button type="submit" className="btnlength">
              Login
            </Button>
          )}

          <div className="signin">
            <p>
              Don't have an account ?{" "}
              <span onClick={() => navigate("/user/Signup")}>
                Create account
              </span>
            </p>
            <p
              className="forgottenp"
              onClick={() => navigate("/user/login/forgottenpassword")}
            >
              Forgotten password ?
            </p>
          </div>
        </form>
  
      </div>

      <div className="footer">
        <div className="frontitemhover">
          <p>
            Powered by Badu Tech. All rights reserved
            <span style={{ color: "green" }}> @ </span> 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInUser;
