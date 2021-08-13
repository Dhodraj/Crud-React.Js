import React from 'react'
import "./AddUser.css"
import {useState} from "react";
import Axios from "axios";
import {Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik"

export default function AddUser() {

const [fname, setFname]= useState("");
const [lname, setLname]= useState("");
const [mail, setMail]= useState("");
const [word,setWord]= useState("");

const initialValues = {
  fname:"",
  lname:"",
  mail:""
}

const addUser=values=>{
  Axios.post('http://localhost:3005/create',{
    fname:values.fname, lname:values.lname, mail:values.mail,
  }).then((response)=>{
    console.log("success");
   if(response.data.message){
     setWord(response.data.message);
   }
  })
}


  return (
    <div className="appContainer">

      
      
      <Formik initialValues={initialValues} onSubmit={addUser} >
        <Form>
        <div className="Appinfo">
      <label >First Name</label>
      <Field id="fname" name="fname" type="text" required placeholder="FirstName"  />
      <br/>
      <label>Last Name</label>
      <Field id="lname" name="lname" type="text" required placeholder="LastName" />
      <br/>
      <label>E-Mail</label>
      <Field  id="mail" name="mail"  type="email" required placeholder="E-Mail" />
      <br/>
       <button className="adduserButton">Add User</button>
       </div>
       </Form>
       </Formik>
      
      

      <div className="popup">{word}</div>

      <div className="backButton">
        
        <Link to="/">
        <button>Back</button>
        </Link>
        
      </div>

    </div>
  )
}
