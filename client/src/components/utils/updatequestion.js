
import {  FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField } from '@mui/material';
  import { useFormik } from 'formik';
  import React, { useEffect, useState } from 'react';
  import { Button, Form } from 'react-bootstrap';
  import { useSelector,useDispatch } from 'react-redux';
  import { PushSpinner } from 'react-spinners-kit';
  import * as Yup from "yup";

  import { addQuestion, getCourse, updatequestions } from '../../store/actions/datacollection';
  import { saveEditorContent } from './reuseable';
  
  const UpdateQuestion = (props) => {
      const [erorAlert,setError]=useState(false)
      const notifications =useSelector((value)=>value.notification);
      const [btnload,setbtn]=useState(false)
      useEffect(()=>{
          if(notifications && notifications.notice){
          
          setbtn(false)
          }})
      const [loadingbtn, setloadbtn] = useState(false);
      
      const dispatch=useDispatch();
     
      const Formik = useFormik({
        initialValues: {
        
          question:`${ props.question ? props.question.question :"" }` ,
         
          a:`${ props.question ? props.question.a :"" }` ,
          b:`${ props.question ? props.question.b :"" }` ,
          c:`${ props.question ? props.question.c :"" }` ,
          d:`${ props.question ? props.question.d :"" }` ,
          answer:`${ props.question ? props.question.answer:"" }` ,
          point:`${ props.question ? props.question.point :"" }` ,
  
        
      
        },
    
        enableReinitialize: true,
        validationSchema: Yup.object({
         question: Yup.string().required("field required"),
         a: Yup.string().required("field required"),
         b: Yup.string().required("field required"),
         c: Yup.string().required("field required"),
         d: Yup.string().required("field required"),
         answer: Yup.string().required("field required"),
         point: Yup.string().required("field required"),
  
          
        
        }),
        onSubmit: (value) => { 
        
         setbtn(true)
         
       dispatch( updatequestions(props.question._id,value)
       )
       dispatch(getCourse(props.subjectid))
      
        }
      });
  
  
        useEffect(() => {
          if (notifications && notifications.notice) {
            setloadbtn(false);
          
            
          }
        });
    
    return (
  <div className='resuseformscontent' id="editor">
  <p>Update Question : <span>{props.header}</span></p>
  

  <Form className='editorcontainerreuse' onSubmit={Formik.handleSubmit}>
    <TextField
    className='textfield'
                    
    
              name="question"
              label="Question"
              multiline={true}
              rows={8}
              {...Formik.getFieldHelpers("question")}
              value={Formik.values.question}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.question &&
                Boolean(Formik.errors.question)
              }
              helperText={
                Formik.touched.question && Formik.errors.question
              }
    />


<TextField
    className='textfield'
    style={{marginTop:"20px"}}
                    
    
              name="a"
              label="Option A"
              multiline={true}
              rows={2}
              {...Formik.getFieldHelpers("a")}
              value={Formik.values.a}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.a &&
                Boolean(Formik.errors.a)
              }
              helperText={
                Formik.touched.a && Formik.errors.a
              }
    />

<TextField
    className='textfield'
    style={{marginTop:"20px"}}    
              name="b"
              label="Option B"
              multiline={true}
              rows={2}
              {...Formik.getFieldHelpers("b")}
              value={Formik.values.b}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.b &&
                Boolean(Formik.errors.b)
              }
              helperText={
                Formik.touched.b && Formik.errors.b
              }
    />


<TextField
    className='textfield'
    style={{marginTop:"20px"}}    
              name="c"
              label="Option C"
              multiline={true}
              rows={2}
              {...Formik.getFieldHelpers("c")}
              value={Formik.values.c}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.c &&
                Boolean(Formik.errors.c)
              }
              helperText={
                Formik.touched.c && Formik.errors.c
              }
    />
  <TextField
    className='textfield'
    style={{marginTop:"20px"}}    
              name="d"
              label="Option D"
              multiline={true}
              rows={2}
              {...Formik.getFieldHelpers("d")}
              value={Formik.values.d}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.d &&
                Boolean(Formik.errors.d)
              }
              helperText={
                Formik.touched.d && Formik.errors.d
              }
    />

<div style={{display:"flex",flexDirection:"row",width:"100%"}}>
<FormControl
          fullWidth
          style={{
            marginTop: "20px",marginRight:"20px"
          }}
        >
          <InputLabel id="demo-simple-select-label">
           Answer
          </InputLabel>
          <Select
            name="answer"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Formik.values.answer}
            label="Answer"
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.answer && Boolean(Formik.errors.answer)}
            helperText={Formik.touched.answer && Formik.errors.answer}
            {...Formik.getFieldHelpers("answer")}
          >
           <MenuItem value="a">Option A</MenuItem>
            <MenuItem value="b">Option B</MenuItem>
            <MenuItem value="c">Option C</MenuItem>
            <MenuItem value="d">Option D</MenuItem>
          </Select>
        </FormControl>
        <TextField
    className='textfield'
    style={{marginTop:"20px"}}    
              name="point"
              label="Point"
            
              {...Formik.getFieldHelpers("point")}
              value={Formik.values.point}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.point &&
                Boolean(Formik.errors.point)
              }
              helperText={
                Formik.touched.point && Formik.errors.point
              }
    />



</div>

{btnload ?
<span style={{margin:"10px"}}>
<PushSpinner color="aqua" size={17} />
</span>
 

    :  <Button type='submit' style={{margin:"10px"}}>Update Question</Button>
}

  </Form>

  
  </div>
  
    );
  };
  
  export default UpdateQuestion;
  
  