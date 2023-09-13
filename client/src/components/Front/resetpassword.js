import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { Passwordreset, SignIn } from "../../store/actions/adminActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockFill } from "react-bootstrap-icons";

const Resetpasspage = () => {
  useEffect(() => {
    if (Formik.values.password !== "") {
      if (Formik.values.password === Formik.values.comfirmpass) {
        setbtn(true);
      } else {
        setbtn(false);
      }
    } else {
      setbtn(false);
    }
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const [showbtn, setbtn] = useState(false);
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
      email: `${token ? token : ""}`,
      password: "",
      comfirmpass: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string()
        .required("field required")
        .min(8, "password must be at least 8 characters"),
      email: Yup.string().required("field required").email("email invalid!"),
      comfirmpass: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {},
  });
  useEffect(()=>{

    if(Formik.values.password === Formik.values.comfirmpass){
      document.getElementById("errorspan").classList.remove("showerror")
    }
   
})

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
      <div className="registerme">
        <div
          className="backgroundim"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2015/10/22/17/28/stack-of-books-1001655_1280.jpg')`,
          }}
        >
          <span>
Join  now to embark on your journey of
            cyber resilience and empowerment.
          </span>
        </div>
        <div className="formsp">
          <form onSubmit={Formik.handleSubmit} className="myform">
            <input
             className="inputfield"
              style={{ margin: "10px 10px 10px 0" }}
              name="password"
              placeholder="Password"
            type="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.password && Boolean(Formik.errors.password)}
              helperText={Formik.touched.password && Formik.errors.password}
              {...Formik.getFieldHelpers("password")}
              label="Password"
            ></input>
            <input
             className="inputfield"
              style={{ margin: "10px 10px 10px 0" }}
              name="comfirmpass"
              value={Formik.values.comfirmpass}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.comfirmpass && Boolean(Formik.errors.comfirmpass)
              }
              helperText={
                Formik.touched.comfirmpass && Formik.errors.comfirmpass
              }
              {...Formik.getFieldHelpers("comfirmpass")}
              label="Comfirm Password"
            ></input>
               <span id="errorspan" className="errorspan">password must be the same.</span>
            {showbtn ? (
              <div>
                {loading ? (
                  <CircleSpinner color="aqua" />
                ) : (
                  <Button
                    onClick={() => {
                      if(Formik.values.password !==Formik.values.comfirmpass){
        document.getElementById("errorspan").classList.add("showerror")

  
      }else{
        setload(true);
                      dispatch(Passwordreset(Formik.values));
      }

                   
                    }}
                    style={{
                      marginBottom: "50px",
                      width: "98%",
                      marginTop: "30px",
                    }}
                  >
                    Reset Password
                  </Button>
                )}
              </div>
            ) : (
              <div className="btnblock">
                <LockFill /> Reset Password
              </div>
            )}
          </form>
        </div>
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

export default Resetpasspage;
