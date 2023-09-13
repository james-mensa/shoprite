import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderView from "../utils/loaderView";
import {  getCourses } from "../../store/actions/datacollection";
import { useNavigate } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";
import TopNavLog from "./signednav";

const PlayQuiz = () => {
    const navigate=useNavigate();
  const [loading, setloading] = useState(false);
  const [takequiz,settakequiz]=useState(false)
  const [subjectid, setsubjectid] = useState("");
  const [duration, setduration] = useState("");
  const [quizes, setquizes] = useState([]);
  const [quizesid, setquizesid] = useState([]);
  const [quizename, setquizename] = useState([]);
  const [questions, setquestion] = useState([]);
  const subjects=useSelector((value)=>value.Allsubjects)
  const dispatch=useDispatch()
  useEffect(()=>{
if(takequiz){
    setTimeout(()=>{
        navigate(`/myassessment/begin/${subjectid}/${quizename}/${quizesid}/${duration}`)
    },5000)
}
  })
useEffect(()=>{
    dispatch(getCourses());
  },[dispatch])
  const show=false;
  return (
 <>
    {
        subjects && subjects.data ? 
        <div
        className="mainLayout"
        style={{
          minHeight: `${window.innerHeight}px`,
          }}
      >
     
       {
        takequiz ?
        <div className="fixedpage" style={{minHeight:`${window.innerHeight}px`}}>
        <div style={{display:"flex",flexDirection:"row"}}><p>Leaving site to take assessment </p>   <div className="fixedpagespan"><Gear/></div></div>
        </div>:null
     }
    
   





     <div
         className="mainLayoutbtr"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}>
       <TopNavLog show={show}/>

       
<div className="quizlayout">
        <p className="instruct">Pick a subject and lets Gooo </p>
        <div className="layoutsubject">
        {  subjects && subjects.data ?
            subjects.data.map((data,index)=>{
                return(
                  <div key={index}>

                  <div 
                    onClick={()=>{
                        setsubjectid(data._id)
                        setquizes(data.quizes)

                    }}
                      className= {
                        subjectid ===data._id ? "subjectbtn_s" : "subjectbtn"

                      } >
                      <p> {
                        data.title
                    }
</p>
                   
                    </div>
                    {
                      subjectid===data._id ?
                      <div className="layoutquizmobile">
        {  quizes.length >0 ?
            quizes.map((data,index)=>{
                return(
                    <span key={index}
                    onClick={()=>{
                      
                        setquestion(data.questions)
                        settakequiz(true)
                        setquizesid(data._id)
                        setquizename(data.title)
                        setduration(data.duration)

                    }}
                      className= 
                       "quizbtn"

                       >
                    {
                        data.title
                    }

                    </span>
                )
            })
            :null
        }
        </div>
        :null

                    }
     
                  </div>
               
                )
            })
            :null
        }



      
        </div>
        <div className="layoutquizdesktop">
        {  quizes.length >0 ?
            quizes.map((data,index)=>{
                return(
                    <span key={index}
                    onClick={()=>{
                      
                        setquestion(data.questions)
                        settakequiz(true)
                        setquizesid(data._id)
                        setquizename(data.title)
                        setduration(data.duration)

                    }}
                      className= 
                       "quizbtn"

                       >
                    {
                        data.title
                    }

                    </span>
                )
            })
            :null
        }
        </div>

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

      :
      <LoaderView/>

    }
    
      </>
  );
};

export default PlayQuiz;
