import React, { useEffect, useState, useReducer } from "react";
import {
  Award,
  Badge3d,
  BadgeHdFill,
  BoxArrowDownLeft,
  BoxArrowDownRight,
  BoxArrowRight,
  Cast,
  CompassFill,
  Gem,
  Trophy,
} from "react-bootstrap-icons";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TopNavLog from "../utils/signednav";
import { getAllUsers } from "../../store/actions/adminActions";

const HomeDashbord = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getAllUsers())
  },[dispatch])
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
    return formattedDate;
  }
 
  const [loading, setloading] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);
  const navigate = useNavigate();
  const show = true;

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

  const [quizesreturn, setquizesreturn] = useState([]);
  const Students = useSelector((data) => data.students);
  const [allstudents, setstudent] = useState([]);
  const showbadge = (value) => {
    let badge = "";

    if (value === 100) {
      badge = "The Don";
    }
    if (value >= 90 && value < 100) {
      badge = "Pythagoras";
    }
    if (value >= 80 && value < 90) {
      badge = "Hypatia";
    }
    if (value < 80) {
      badge = "Intermediate";
    }

    return badge;
  };

  const returnStudentName = (id) => {
    let studentName = "";
    allstudents.forEach((student) => {
      if (student._id === id) {
        studentName = student.fullname;
      }
    });

    return studentName;
  };
  useEffect(() => {
    if (Students && Students.data) {
      let arrays = Students.data;

      arrays.sort(function (a, b) {
        return b.totalpoints - a.totalpoints;
      });

      setstudent(arrays);
      let returnquizes = [];
      allstudents.map((student) => {
        if (student.quizes && student.quizes.length > 0) {
          student.quizes.map((data) => {
            if (checkdate(data.createdAt)) {
              returnquizes.push(data);
            }

            return true;
          });
        }
        setquizesreturn(returnquizes);

        return true;
      });
    }
  }, [allstudents, Students]);
 

  return (
    <div
      className="mainLayoutb"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
      <div
        className="dashback"
        style={{
          minHeight: `${window.innerHeight}px`,
          backgroundImage:
            "url('https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/stages.jpg24953.09997584616')",
        }}
      >
        <div
          className="dashcover"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <TopNavLog show={show} />
          <div className="quiztodayh">
            <p>Quizes Taken today</p>
          </div>
          <div className="quiztoday">
            {quizesreturn && quizesreturn.length > 0
              ? quizesreturn.map((item, index) => {
                  return (
                    <div className="quizreturn">
                      <p>{returnStudentName(item.student)}</p>
                      <p>
                        <Gem /> <span>{item.total_score}</span>
                      </p>
                      <p>
                        <Award />
                        <span>{showbadge(item.score_rate)}</span>
                      </p>
                    </div>
                  );
                })
              : <div className="nonetaken">No Quizes taken today</div>
              }
          </div>

          <div className="leadersboard">
            {allstudents[1] ? (
              <div className="secondp">
              <p className="position">2nd</p>
                <div className="image_c">
                  <img
                    className="imagepics"
                    alt=""
                    src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/person2.png18487.629277758933"
                  ></img>
                </div>

                <p>{allstudents[1].fullname}</p>
                <span className="trophy">
                  <Trophy color="black" />
                </span>
                <p>Earn {allstudents[1].totalpoints} Points</p>
                <p className="mobile">
                  Joined since {formatDate(allstudents[1].createdAt)}
                </p>
              </div>
            ) : (
              <div className="secondp">
              <p className="position">2nd</p>
                <div className="image_c">
                  <img
                    className="imagepics"
                    alt=""
                    src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/person2.png18487.629277758933"
                  ></img>
                </div>

                <p className="mobile">....</p>
              </div>
            )}
            <>
              {allstudents[0] ? (
                <div className="firstp">
                <p className="position">1st</p>
                  <div className="image_c">
                    <img
                      className="imagepicf"
                      alt=""
                      src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/person3.png19203.671134266864"
                    ></img>
                  </div>

                  <p>{allstudents[0].fullname}</p>
                  <span className="trophy">
                    <Trophy color="black" />
                  </span>
                  <p>Earn {allstudents[0].totalpoints} Points</p>
                  <p className="mobile">
                    Joined since {formatDate(allstudents[0].createdAt)}
                  </p>
                </div>
              ) : (
                <div className="firstp">
                <p className="position">1st</p>
                  <div className="image_c">
                    <img
                      className="imagepicf"
                      alt=""
                      src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/person3.png19203.671134266864"
                    ></img>
                  </div>

                  <p className="mobile">....</p>
                </div>
              )}
            </>
            <>
              {allstudents[2] ? (
                <div className="thirdp">
                <p className="position">3rd</p>
                  <div className="image_c">
                    <img
                      className="imagepict"
                      alt=""
                      src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/person1.png68386.15179723885"
                    />
                  </div>
                  <p>{allstudents[2].fullname}</p>

                  <span className="trophy">
                    <Trophy color="black" />
                  </span>
                  <p>Earn {allstudents[2].totalpoints} Points</p>
                  <p className="mobile">
                    Joined since {formatDate(allstudents[2].createdAt)}
                  </p>
                </div>
              ) : (
                <div className="thirdp">
                <p className="position">3rd</p>
                  <div className="image_c">
                    <img
                      className="imagepict"
                      alt=""
                      src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/person1.png68386.15179723885"
                    />
                  </div>
                  <p>....</p>
                </div>
              )}
            </>
          </div>

          <div className="quiztodayh">
            <p>
              Leaders Board <Trophy color="white" />
            </p>
          </div>
          <div className="leadersboardview">
            <div className="tablelayoutd">
              <div className="table_headerd">
                <div className="headerlayout">Rank</div>
                <div className="headerlayout_n">Name</div>
                <div className="headerlayout">Subjects taken</div>
                <div className="headerlayout">Quizes Taken</div>
                <div className="headerlayout">Badges</div>
                <div className="headerlayout">Points Earn</div>
                <div className="headerlayout_n">Joined since</div>
              </div>
              {allstudents && allstudents.length > 0
                ? allstudents.map((data, index) => {
                    return (
                      <div className="table_headerc" key={index}>
                        <div className="headerlayout">{index + 1}</div>
                        <div className="headerlayout_n">{data.fullname}</div>

                        <div className="headerlayout">
                          {data && data.subjects ? data.subjects.length : ""}
                        </div>
                        <div className="headerlayout">
                          {data && data.quizes ? data.quizes.length : ""}
                        </div>
                        <div className="headerlayout">
                          {data && data.badges ? data.badges.length : ""}
                        </div>
                        <div className="headerlayout">{data.totalpoints}</div>
                        <div className="headerlayout_n">
                          {formatDate(data.createdAt)}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="frontitemhover">
          <p>
          Powered by Badu Tech.
            All rights reserved
            <span style={{ color: "green" }}> @ </span> 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeDashbord;
