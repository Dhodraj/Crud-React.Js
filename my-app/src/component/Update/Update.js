import {useState} from "react";
import React from 'react'
import Axios from "axios"


export default function Update(props) {

    const [newMail ,setNewMail ]= useState("");
    const [userList, setUserlist]= useState([]);
    const id=props.id;
    console.log("ganapriya");
    
    const updateUserdetails=(id)=>{
      console.log(id);
        Axios.put("http://localhost:3005/update", {mail:newMail, id:id}).then((response)=>{
          console.log(id);
          setUserlist(userList.map((val)=>{
            return val.id===id 
            ? {
              id:val.id,
              fname:val.fname,
              lname:val.lname,
              mail:val.mail,
            }
            :val;
          }))
        }
        );
      };

    return (
        <div className="updateUser">
            <label>E-Mail</label>
            <input type="text" placeholder="Mail" onChange={(event)=>{setNewMail(event.target.value);}} />            
            <br/>
            <button className="updateButton" onClick={()=>{updateUserdetails(id);}}>Update</button>            
        </div>
    )
}
