import React, { useEffect, useState, useReducer } from "react";
import {
  ArrowLeftShort,
  ArrowRightShort,
  CaretRightFill,

  HandIndexFill,
  Person,
  Quote,
} from "react-bootstrap-icons";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNav from "../utils/pagenav";
import Typed from "typed.js";
import { IconButton } from "@mui/material";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide,useSwiper } from "swiper/react";
import "swiper/css";


const Home = () => {
  const [loading, setloading] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);
  const [imagec, setimage] = useState(
    "https://res.cloudinary.com/dewkx66gl/image/upload/v1694197981/Ghana-Card-Sample-1536x560_vrqyid.png"
  );

  const navigate = useNavigate();

  const howItWorks = [
    {
      header: "Be a Hero, Help Others",
      msg: " If you've found an ID card, report the details in our app. We'll cross-check it with our database and alert the owner if it's a match,  Your good deed could save someone's day!",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694281972/losttem1_jejhwv.jpg",
    },
    {
      header: "Find your lost card",
      msg: "If you've lost your ID card, simply post the details on our platform. We'll help spread the word and notify you if a match is found",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694281951/driverlost_afm1u8.jpg",
    },
    {
      header: "Secure Verification Process",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694281784/found1_rdaypj.jpg",
      msg: "For security, we'll perform a quick verification to ensure the ID card goes to its rightful owner. Once verified, you can chat with the finder and arrange the return",
    },
    {
      header: "Direct Chat with the Finder",
      msg: "Once verified, you can chat directly with the finder of your lost ID card. Arrange a safe and convenient way to get it back",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694283758/exchanges_zcra5k.jpg",
    },
  ];
  const [instructions, setinstruction] = useState(howItWorks[0]);
  const Asset = [
    "https://res.cloudinary.com/dewkx66gl/image/upload/v1694197707/spaces_-Ma8gvgl1y7j-M_RfiTg_uploads_OKOunCJyNRVtdr1LYPvS_image_qdbihh.webp",
    "https://res.cloudinary.com/dewkx66gl/image/upload/v1694197695/spaces_-Ma8gvgl1y7j-M_RfiTg_uploads_EiIYtfrIyLMwgkgLhKGo_image_wlnglf.webp",
  ];
  useEffect(() => {
    let countnum = 0;
    setInterval(() => {
      setinstruction(howItWorks[countnum]);
      countnum = countnum + 1;
      if (countnum === 4) {
        countnum = 0;
      }
    }, 8000);
  }, []);

  useEffect(() => {
    let countnum = 0;
    setInterval(() => {
      setimage(Asset[countnum]);
      countnum = countnum + 1;
      if (countnum === 2) {
        countnum = 0;
      }
    }, 5000);
  }, []);

  useEffect(() => {
    const typed = new Typed("#welcom_p", {
      strings: [
        "Welcome to IDRescue, the ultimate solution for lost ID card recovery! Have you lost your ID card? Or perhaps you've found one? We're here to help you reunite with your lost ID card or connect with its rightful owner",
      ],
      typeSpeed: 10,
      showCursor: false,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
 

  const useSwipe =useSwiper();
  return (
    <div
      className="mainLayoutb"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
      <div
        className="mainLayoutcover"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <TopNav />
        <div className="landingpage">
          <div className="leftland">
            <h1>
              Find, Post, Reunite with Real Owner - Let's Save the Stress .
            </h1>
            <div
              style={{
                width: "100%",
                justifyContent: "left",
                alignItems: "start",
                height: "100px",
              }}
            >
              <p id="welcom_p"></p>
            </div>
            <div className="searchbox">
              <input
                className="searchbox_field"
                placeholder="find lost Id card .eg Type card holder name and Id number"
              ></input>
              <span className="searchbtn">Search</span>
            </div>
          </div>
          <div className="rightland">
            <div className="image_hover">
              <div
                className="homeimage"
                style={{ backgroundImage: `url(${imagec})` }}
              ></div>
            </div>

            <div className="join-us">
              <p>
                Join a Community of Responsible Citizens{" "}
                <span className="hand-index">
                  <HandIndexFill className="index" />
                </span>{" "}
                <span className="register-btn">Register</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="how-it-works"
        style={{
          minHeight: `${window.innerHeight}px`,
          backgroundImage: `url(${instructions.image})`,
        }}
      >
        <div className="h_left">
          <h1>{instructions.header}</h1>
          <p>{instructions.msg}</p>
        </div>
        <div className="h_right">
          <span>
            <IconButton>
              <CaretRightFill color="rgb(218, 216, 231)" size={30} />
            </IconButton>
          </span>
          <img className="ghanaimg" alt="" src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694368079/Pngtree_ghana_flag_png_free_vector_6848830_wz6f2m.png"></img>
        </div>
      </div>

      <div
        className="testimonies"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="review-header">
          <div>
            {" "}
            <p>User Reviews</p>
          </div>

          <div className="actionbtn">
            <span>
              <IconButton onClick={()=>{
              
              }}>
                <ArrowLeftShort />{" "}
              </IconButton>
            </span>
            <span>
              <IconButton
              onClick={()=>{
                useSwipe.slideNext()
              }}>
                <ArrowRightShort />
              </IconButton>
            </span>
          </div>
        </div>

        <Swiper
          style={{ width: "1300px" }}
          className="swiper"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          autoplay={{delay:5000}}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        
        >
          <SwiperSlide>
            <div className="show-review">
              <p>
                <span className="quote-css"><Quote/></span>
                This is a good testimonial example that users can take in
                without the danger of distraction. The testimonials page is a
                grid of images with each of them serving as a link to a full
                case study
                <span className="quote-css"><Quote/></span>
              </p>
              <div className="postedby">
                <Person />
                <span>James mensah</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="show-review">
              <p>
              <span className="quote-css"><Quote/></span>
                This is a good testimonial example that users can take in
                without the danger of distraction. The testimonials page is a
                grid of images with each of them serving as a link to a full
                case study
                <span className="quote-css"><Quote/></span>
              </p>
              <div className="postedby">
                <Person />
                <span>James mensah</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="show-review">
              <p>
              <span className="quote-css"><Quote/></span>
                This is a good testimonial example that users can take in
                without the danger of distraction. The testimonials page is a
                grid of images with each of them serving as a link to a full
                case study
                <span className="quote-css"><Quote/></span>
              </p>
              <div className="postedby">
                <Person />
                <span>James mensah</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="show-review">
              <p>
              <span className="quote-css"><Quote/></span>
                This is a good testimonial example that users can take in
                without the danger of distraction. The testimonials page is a
                grid of images with each of them serving as a link to a full
                case study
                <span className="quote-css"><Quote/></span>
              </p>
              <div className="postedby">
                <Person />
                <span>James mensah</span>
              </div>
            </div>
          </SwiperSlide>
       
        </Swiper>
      </div>
      <div className="partners" style={{minHeight:`${window.innerHeight}px`}}>
      <h1>Partners</h1>
      <div className="layout-partners">
      <img className="partner-img"  alt="" src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694365414/pngwing.com_5_wyt6ua.png"></img>

      </div>

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

export default Home;
