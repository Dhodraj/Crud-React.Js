import React from 'react'
import { useState, useEffect } from 'react'; 
import Axios from "axios";
import "./Lists.css";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"


export default function Lists() {

    const [userList, setUserlist]= useState([]);
    const [newfname, setNewfname]= useState("");
    const [newlname, setNewlname]= useState("");
    const [newmail, setNewmail]= useState("");
    const [count, setCount]=useState(0);

    const toggle=()=>{
      if(count==1)
      {
        setCount(0);
      }else{
        setCount(1);
      }
    }



    const getUsers= async()=>{
      try{
        const data= await Axios.get("http://localhost:3005/details");
        setUserlist(data.data); 
      }catch(e){
        console.log(e)
      }
    };
    useEffect(()=>{
      getUsers();
    },[]);


    const updateFname=(id)=>{
      Axios.put("http://localhost:3005/updatefname", {fname:newfname, id:id}).then((response)=>{
        console.log(id);
        setUserlist(userList.map((val)=>{
          return val.id===id 
          ? {
            
            id:val.id,
            fname:newfname,
            lname:val.lname,
            mail:val.mail,
          }
          :val;
        }))
      },
      setNewfname("")
      );
    };

    const updateLname=(id)=>{
      Axios.put("http://localhost:3005/updatelname", {lname:newlname, id:id}).then((response)=>{
        console.log(id);
        setUserlist(userList.map((val)=>{
          return val.id===id 
          ? {
            
            id:val.id,
            fname:val.fname,
            lname:newlname,
            mail:val.mail,
          }
          :val;
        }))
      },
      setNewlname("")
      );
    };

    const updateMail=(id)=>{
      Axios.put("http://localhost:3005/updatemail", {mail:newmail, id:id}).then((response)=>{
        console.log(id);
        setUserlist(userList.map((val)=>{
          return val.id===id 
          ? {
            
            id:val.id,
            fname:val.fname,
            lname:val.lname,
            mail:newmail,
          }
          :val;
        }))
      },
      setNewmail("")
      );
    };



    const deleteUser=(id)=>{
        Axios.delete(`http://localhost:3005/delete/${id}`).then((response)=>{
          console.log(id);
          setUserlist(
            userList.filter((val)=>{
              return val.id!==id;
            })
          );
        });
      };
      

    return (
        <div className="datatable">
          <div>
          <button className="editButton" onClick={toggle} ><EditIcon /></button>   
          </div>

            <table className="tableprint">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>E-Mail</th>
                        <th>Delete</th>
                    </tr>
                </thead>
            

            {userList.map((val,key)=>{
                return(
                    <tr>
                        <td>
                          {val.fname}
                          <br/>
                          <br/>
                          <div className="editOption">
                          {count===1?
                          <div><input type="text" placeholder="First Name" onChange={(event)=>{setNewfname(event.target.value);}} required/>
                          <button onClick={()=>{updateFname(val.id);}}>Update</button></div>:null}
                          </div>
                        </td>
                        <td>
                          {val.lname}
                          <br/>
                          <br/>
                          <div className="editOption">
                          {count===1?
                          <div><input type="text" placeholder="Last Name" onChange={(event)=>{setNewlname(event.target.value);}} required/>
                          <button onClick={()=>{updateLname(val.id);}}>Update</button></div>:null}
                          </div>
                          </td>
                        <td>
                          {val.mail}
                          <br/>
                          <br/>
                          <div className="editOption">
                          {count===1?
                          <div><input type="email" placeholder="E-Mail" onChange={(event)=>{setNewmail(event.target.value);}} required/>
                          <button onClick={()=>{updateMail(val.id);}}>Update </button></div>:null}
                          </div>
                        </td>
                        <td>
                          <button className="deleteButton" onClick={()=>{if(window.confirm('Delete the item?')){deleteUser(val.id);}}} >  <DeleteOutlineIcon/> </button> 
                        </td>
                    </tr>
                    
                )
            })}



            {/* {userList.map((val,key)=>{
        return(
          <div className="users">
            <div className="userList">
              <span>First Name: {val.fname}</span>
              <br/>
              <br/>
              <span>Last Name: {val.lname}</span>
              <br/>
              <br/>
              <span>E-Mail: {val.mail}</span>
              <br/>
              <br/>
            </div>
            </div>
            )})
            } */}
        </table>
        </div>

    )
}
