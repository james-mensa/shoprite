import { IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { PushSpinner } from 'react-spinners-kit';
import * as Yup from "yup";
import { AddSubjectServer, DeleteSubject, getCourses } from '../../store/actions/datacollection';
import { useNavigate } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const QuizPanel=()=>{

    const [loadingbtn, setloadbtn] = useState(false);
    const [subjectid, setsubid] = useState(""); 
const dispatch=useDispatch();
const subjects=useSelector((value)=>value.Allsubjects)

const navigate=useNavigate()

useEffect(()=>{
  dispatch(getCourses());
},[dispatch])

      const notifications = useSelector((value) => value.notification);
      useEffect(() => {
        if (notifications && notifications.notice) {
          setloadbtn(false);
        }
      });
    return(
        <div className="profile_box_m_admin">
        <div className="profile_header">
          <h1> Subjects Assessment</h1>
       
        </div>

        {  subjects && subjects.data ? (
          subjects.data.map((data, index) => {
          return (
            <div className=" courselabel" key={index} >
            <p>No {index+1}</p>
              <div className="coursecontrol">
                <h1>{data.title}</h1>{" "}
                <div className="btnss">
                 

                  {loadingbtn && subjectid ===data._id ? (

                <PushSpinner size={10} />
                   
                  ) : (
                    <IconButton
                      className="btnlabel"
                      onClick={() => {
                        dispatch(DeleteSubject(data._id));
                        setloadbtn(true);
                        dispatch(getCourses());
                        setsubid(data._id)
                      }}
                    >
                    <Trash color="dark" size={18}/>
                     
                    </IconButton>
                  )}


                  <span className="btnlabel"
                  onClick={()=>{
                    navigate(`/mainadmin/singlecourse/${data._id}`)
                  }}
                  >Explore</span>
                </div>{" "}
              </div>

             

          
              <div>
                <p>Subject Description</p>
                <p>{data.detail}</p>
              </div>  

       
             
            </div>
          );
        })
      ) : (
        <div>
          <p>No courses</p>
        </div>
      )}


      </div>
    )
}


export default QuizPanel;