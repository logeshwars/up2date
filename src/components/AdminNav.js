import React, { useState } from 'react'
import { auth} from "../firebase";
import { Navigate } from 'react-router-dom';
function AdminNav({setNav}) {
    const[gotoMain,setgotoMain]=useState(false);
    const signOut=()=>{
        auth
        .signOut()
        .then(() => {
         setgotoMain(true);
        })
        .catch((error) => console.log(error.message));
    };
    
    return (
        <div className="navBar">
          <div className='navBarInside'>
             {gotoMain&&(<Navigate to="/" replace />)}
             
        <div className='flex'>
        <button className='menuButton' onClick={()=>setNav()}><img src="images/list.png" alt=""/></button>
          <span className="logo">
            up<span className="logoMiddle">2</span>date
          </span>{" "}
          <span className="logoEvent">events</span>
        </div>
        <h3>Admin</h3>
        <div className="loginButtonHolder">
          <button className="loginButton" onClick={()=>signOut()}>Sign out</button>
        </div>
        </div>
        </div>
    )
}

export default AdminNav
