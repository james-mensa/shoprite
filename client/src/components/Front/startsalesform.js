import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Filter, HandIndex, Image } from "react-bootstrap-icons";
import {
  AddProduct,
  Deleteproduct,
  addSales,
  getProducts,
  updateProduct,
} from "./../../store/actions/datacollection";
import { format } from "date-fns";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import UpdateForm from "./updateform";
const StartSaleform = () => {
  const randomNumber = Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;

  // Generate three unique characters
  const uniqueCharacters = generateUniqueCharacters(3);

  // Function to generate unique characters
  function generateUniqueCharacters(count) {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);

      // Ensure the character is unique
      if (!result.includes(randomChar)) {
        result += randomChar;
      }
    }

    return result;
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
    return formattedDate;
  }
  const [showmodify, setmodify] = useState(false);
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const [startDate_m, setStartDate_m] = useState(new Date());
  const [startDate_e, setStartDate_e] = useState(new Date());
  const [targetproduct, settarget] = useState([]);
  const [cart, setcart] = useState([]);
  const Checkuser = useSelector((item) => item.authuser);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setTimeout(() => {
        setmodify(false);
      }, 1000);

      setload(false);
    }
  });
  const dispatch = useDispatch();
  const [total_price, settotalp] = useState(0);
  useEffect(() => {
    dispatch(getProducts());
  });
  const [cartItem, addCart] = useState([]);
  useEffect(() => {
    cartItem.forEach((data) => {
      settotalp(total_price + data.price);
    });
  }, [cartItem]);

  const Formik = useFormik({
    initialValues: {
      issuer: Checkuser && Checkuser.account ? Checkuser.account._id : "",
      productid: targetproduct ? targetproduct._id : "",
      customer: "",
      payment: "",
      product: targetproduct ? targetproduct.productname : "",
      quantity: targetproduct ? targetproduct.quantity : "",
      price: targetproduct ? targetproduct.quantity * targetproduct.price : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      product: Yup.string().required("field required"),

      quantity: Yup.number().required("comfirm password"),
      price: Yup.number().required("field required"),
    }),
    onSubmit: (value) => {},
  });

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

  const allproducts = useSelector((data) => data.Allproducts);
  const [searchdate, setsearchdate] = useState(new Date());
  const [productid, setproductid] = useState("");
  return (
    <div className="userdetail">
      <p id="bottomform"></p>

      <div className="purchase-layout">
        <div className="formissuer">
          <form onSubmit={Formik.handleSubmit} className="myform-report">
            <div className="formlayout">
              <div className="formlayout-p">
                <p>
                  <span style={{ color: "red" }}>*</span> Product name
                </p>
                <TextField
                  style={{ width: "98%" }}
                  name="product"
                  disabled
                  value={Formik.values.product}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  error={
                    Formik.touched.product && Boolean(Formik.errors.product)
                  }
                ></TextField>
              </div>

              <div className="formlayout">
                <div className="formlayout-p">
                  {" "}
                  <p>
                    <span style={{ color: "red" }}>*</span> Quantity
                  </p>
                  <TextField
                    style={{ width: "30%" }}
                    name="quantity"
                    value={Formik.values.quantity}
                    onChange={(data) => {
                      if (data.target.value > targetproduct.quantity) {
                        alert(`Maximum quantity is ${targetproduct.quantity} `);
                      } else {
                        Formik.setFieldValue("quantity", data.target.value);

                        Formik.setFieldValue(
                          "price",
                          data.target.value * targetproduct.price
                        );
                      }
                    }}
                    onBlur={Formik.handleBlur}
                    error={
                      Formik.touched.quantity && Boolean(Formik.errors.quantity)
                    }
                  ></TextField>
                </div>
                <div className="formlayout-p">
                  <p>
                    <span style={{ color: "red" }}>*</span>GH₵ Unit Price
                  </p>
                  <TextField
                    disabled
                    style={{ width: "70%" }}
                    name="price"
                    value={Formik.values.price}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    error={Formik.touched.price && Boolean(Formik.errors.price)}
                  ></TextField>
                </div>
              </div>
            </div>

            <div className="sub-btn">
              {loading ? (
                <CircleSpinner color="aqua" />
              ) : (
                <>
                  <Button
                    onClick={() => {
                      Formik.setFieldValue("purchaseid", randomNumber);

                      addCart([...cartItem, Formik.values]);
                    }}
                  >
                    Add to Cart
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="cart">
          <div className="cart-info">
            <p>Cart Items</p>
            {cartItem.length > 0 ? (
              <div className="cartdisplay">
                <div className="headert">
                  <div className="c-header-col">No</div>
                  <div className="header-col-h">Product name</div>
                  <div className="c-header-column">Quantity</div>
                  <div className="c-header-column">Price (GH₵)</div>
                </div>

                {cartItem.map((items, index) => {
                  return (
                    <div className="body-t" key={index}>
                      <div className="c-header-col">{(index = 1)}</div>

                      <div className="header-col-h">{items.product}</div>
                      <div className="c-header-column">{items.quantity}</div>
                      <div className="c-header-column">{items.price}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No Item added Yet</p>
            )}
          </div>
          <div className="cart-action">
            <p>
              Total Price GH₵
              <span style={{ color: "blue" }}>{total_price}</span>
            </p>

            <div className="formlayout-p">
              {" "}
              <p>
                <span style={{ color: "red" }}>*</span> Customer
              </p>
              <TextField
                style={{ width: "100%" }}
                name="customer"
                value={Formik.values.barcode}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                error={
                  Formik.touched.customer && Boolean(Formik.errors.customer)
                }
              ></TextField>
            </div>

            <div className="formlayout">
              <div className="formlayout-p">
                <p>
                  <span style={{ color: "red" }}>*</span>Payment
                </p>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Eg. Cash or Mobile money Payment"
                  name="payment"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Formik.values.payment}
                  defaultValue="Cash"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  error={
                    Formik.touched.payment && Boolean(Formik.errors.payment)
                  }
                  {...Formik.getFieldHelpers("payment")}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Mobile money">Mobile money</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                </Select>
              </div>

              {loading ? (
                <span
                    className="checkoutbtn">
  <CircleSpinner color="aqua" />
                    </span>
              
              ) : (
                <>
                  <span
                    className="checkoutbtn"
                    onClick={() => {
                      setload(true);
                      dispatch(
                        addSales(
                          cartItem,
                          Checkuser && Checkuser.account
                            ? Checkuser.account._id
                            : "",
                          Formik.values.customer,
                          Formik.values.payment
                        )
                      );
                    }}
                  >
                    {" "}
                    Checkout{" "}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="header">Products in Stock</p>
      {allproducts && allproducts.data ? (
        <>
          {allproducts.data.length > 0 ? (
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
                {allproducts.data.map((product, index) => {
                  return (
                    <div className="body-t" key={index}>
                      <div className="body-col">{index + 1}</div>

                      <div className="body-col-h">{product.productname}</div>
                      <div className="body-column">{product.quantity}</div>
                      <div className="body-column">{product.price}</div>
                      <div className="body-column">
                        {product.quantity * product.price}
                      </div>
                      <div className="body-column">
                        {formatDate(product.expiryday)}
                      </div>
                      <div className="body-column">
                        <span
                          onClick={() => {
                            settarget(product);
                            setproductid(product._id);
                            setmodify(true);
                            setTimeout(() => {
                              document
                                .getElementById("bottomform")
                                .scrollIntoView({ behavior: "smooth" });
                            });
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          Sale now
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          ) : (
            <p>No Products added today !</p>
          )}
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default StartSaleform;
